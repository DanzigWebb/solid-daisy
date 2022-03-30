import { Accessor, Component, createContext, createSignal, onCleanup, Show, useContext } from 'solid-js';
import { Portal } from 'solid-js/web';
import usePopper from '@root/src/lib/popper/usePopper';
import { SelectDropdown } from '@components/form/select/SelectDropdown';
import { ScaleTransition } from '@components/utils/transitions';

type ContextType = {
    value: Accessor<string>
    setValue: (v: string) => void;
}

const SelectContext = createContext<ContextType>();

type Props = {
    placeholder?: string;
}

export const Select: Component<Props> = (props) => {

    const [value, setValue] = createSignal('');
    const [show, setShow] = createSignal(false);
    const [showPortal, setShowPortal] = createSignal(false);

    const [reference, setReference] = createSignal<HTMLElement>();
    const [popper, setPopper] = createSignal<HTMLElement>();

    const instance = usePopper(reference, popper, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    onCleanup(() => {
        instance()?.destroy();
    });

    function showDropdown() {
        if (show()) {
            return;
        }
        setShow(true);
        setShowPortal(true);
        setListener();
    }

    function hideDropdown() {
        setShow(false);
        removeListener();
    }

    const listener = (e: Event) => {
        if (!show()) {
            return;
        }

        const target = e.target as HTMLElement;
        const select = reference();
        const dropdown = popper();

        if (select?.contains(target)) {
            return;
        }

        const isBackdropClicked = !dropdown?.contains(target);

        if (isBackdropClicked) {
            hideDropdown();
        }
    };

    function setListener() {
        document.addEventListener('click', listener);
    }

    function removeListener() {
        document.removeEventListener('click', listener);
    }

    const store: ContextType = {
        value,
        setValue: optionChecked
    };

    function optionChecked(value: any) {
        setValue(value);
        hideDropdown();
    }

    return (
        <SelectContext.Provider value={store}>
            <input
                ref={setReference}
                class="select select-bordered"
                value={value()}
                placeholder={props.placeholder || ''}
                onClick={showDropdown}
                onFocus={showDropdown}
            />

            <Show when={showPortal()}>
                <Portal>
                    <div ref={setPopper} style={{'min-width': reference()?.scrollWidth + 'px'}}>
                        <ScaleTransition appear={true} onExit={() => setShowPortal(false)}>
                            <Show when={show()}>
                                <SelectDropdown>
                                    {props.children}
                                </SelectDropdown>
                            </Show>
                        </ScaleTransition>
                    </div>
                </Portal>
            </Show>
        </SelectContext.Provider>
    );
};

export const useSelect = () => useContext(SelectContext)!;