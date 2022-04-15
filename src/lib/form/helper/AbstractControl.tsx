import { createSignal, JSX, onMount } from 'solid-js';
import { FormControlAbstract, FormRegisterProps } from '../form.type';

interface Props<T> extends FormRegisterProps {
    onChange?: (v: any) => void;
    children?: (v: any) => T;
}

export const AbstractControl = <T extends JSX.Element>(props: Props<T>) => {
    const control = useControl();

    onMount(() => {
        props.ref(control);
    });

    return props.children?.({...props, value: control.value}) as any;
};

function useControl(): FormControlAbstract {
    const [value, setValue] = createSignal<any>();
    const type = 'abstractControl';

    return {
        value,
        setValue,
        type
    };
}
