import { Accessor, Component, createContext, createMemo, createSignal, Show, useContext } from 'solid-js';
import { SelectDropdown } from './SelectDropdown';

type ContextType = {
    value: Accessor<string>
    setValue: (v: string) => void;
}

const SelectContext = createContext<ContextType>();

type Props = {
    placeholder?: string;
}

export const Select: Component<Props> = (props) => {

    const [reference, setReference] = createSignal<HTMLElement>();
    const [state, setState] = createSignal({
        value: '',
        isHasDropdown: false,
        isShowDropdown: false,
    });

    const value = createMemo(() => state().value);

    function setValue(value: string) {
        setState(state => ({...state, value}));
    }

    function showDropdown() {
        setState(state => ({
            ...state,
            isHasDropdown: true,
            isShowDropdown: true,
        }));
    }

    function destroyDropdown() {
        const isHasDropdown = false;
        setState(state => ({...state, isHasDropdown}));
    }

    function hideDropdown() {
        const isShowDropdown = false;
        setState(state => ({...state, isShowDropdown}));
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

            <Show when={state().isHasDropdown}>
                <SelectDropdown
                    isShow={state().isShowDropdown}
                    reference={reference}
                    onClose={destroyDropdown}
                >
                    {props.children}
                </SelectDropdown>
            </Show>
        </SelectContext.Provider>
    );
};

export const useSelect = () => useContext(SelectContext)!;
