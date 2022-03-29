import { createEffect, createSignal, onCleanup, onMount, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { usePopper } from '../../sdk/popper/usePopper';
import { Options } from '@popperjs/core';
import { SelectContext } from './SelectProvider';

const options: Partial<Options> = {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },
    ],
};

type Props<T> = {
    placeholder?: string;
    onChange?: (v: T) => void;
}

export const Select = <T extends any>(props: PropsWithChildren<Props<T>>) => {
    const [value, setValue] = createSignal<string>();
    const [selectRef, setSelectRef] = createSignal<HTMLElement>();
    const [dropdownRef, setDropdownRef] = createSignal<HTMLElement>();
    const [dropdownWidth, setDropdownWidth] = createSignal<number>();

    const [show, setShow] = createSignal(false);

    const instance = usePopper(selectRef, dropdownRef, options);

    const onOptionCheck = (value: any) => {
        setShow(false);
        setValue(value);
        props.onChange?.(value);
    };

    const listener = (e: MouseEvent) => {
        if (!show()) {
            return;
        }

        const target = e.target as HTMLElement;
        const dropdown = dropdownRef();
        const select = selectRef();

        if (select?.contains(target)) {
            return;
        }

        const isBackdropClicked = !dropdown?.contains(target);

        if (isBackdropClicked) {
            setShow(false);
        }
    };

    onMount(() => {
        document.addEventListener('click', listener);
    });

    createEffect(() => {
        const width = selectRef()?.scrollWidth;
        if (width) {
            setDropdownWidth(width);
        }
    });

    onCleanup(() => {
        instance()?.destroy();
        document.removeEventListener('click', listener);
    });

    return (
        <SelectContext.Provider value={{onOptionCheck}}>
            <div class="sl-form-select">
                <div class="sl-select">
                    <input
                        ref={setSelectRef}
                        type="text"
                        class="h-full w-full border-none rounded"
                        placeholder={props.placeholder}
                        value={value()}
                        onFocus={() => setShow(true)}
                    />
                </div>

                <Show when={show()}>
                    <Portal>
                        <ul
                            class="rounded border shadow-lg"
                            ref={setDropdownRef}
                            style={{width: dropdownWidth() + 'px'}}
                        >
                            {props.children}
                        </ul>
                    </Portal>
                </Show>
            </div>
        </SelectContext.Provider>
    );
};