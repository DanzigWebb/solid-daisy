import { Accessor, Component, createEffect, createSignal, onCleanup, onMount, Show } from 'solid-js';
import { SelectTypeEnum } from '@components/form/select/Select.type';
import { ScaleTransition } from '@components/utils/transitions';
import { Portal } from 'solid-js/web';
import usePopper from '@root/src/lib/popper/usePopper';

type Props = {
    isShow: boolean;
    reference: Accessor<HTMLElement | undefined>;
    onClose?: () => void;
}

export const SelectDropdown: Component<Props> = (props) => {

    const [show, setShow] = createSignal(true);
    const [dropdown, setDropdown] = createSignal<HTMLElement>();

    usePopper(props.reference, dropdown, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    createEffect(() => {
        setShow(props.isShow);
    });

    onMount(() => {
        focusOption();
        setListener();
    });

    onCleanup(() => {
        removeListener();
    });

    function focusOption() {
        const optionsRef = dropdown()?.querySelector(`.${SelectTypeEnum.OPTION_SELECTOR}`) as HTMLButtonElement;
        if (optionsRef) {
            optionsRef.focus();
        }
    }

    function setListener() {
        document.addEventListener('click', listener);
    }

    function removeListener() {
        document.removeEventListener('click', listener);
    }

    const listener = (e: Event) => {
        if (!show()) {
            return;
        }

        const target = e.target as HTMLElement;
        const select = props.reference();
        const dropdownRef = dropdown();

        if (select?.contains(target)) {
            return;
        }

        const isBackdropClicked = !dropdownRef?.contains(target);

        if (isBackdropClicked) {
            setShow(false);
        }
    };

    return (
        <Portal>
            <div ref={setDropdown} style={{'min-width': props.reference()?.scrollWidth + 'px'}}>
                <ScaleTransition appear={true} onExit={() => props.onClose?.()}>
                    <Show when={show()}>
                        <div
                            class="shadow-lg menu dropdown-content bg-base-200 max-h-60 overflow-y-scroll"
                            tabIndex={0}
                        >
                            {props.children}
                        </div>
                    </Show>
                </ScaleTransition>
            </div>
        </Portal>
    );
};