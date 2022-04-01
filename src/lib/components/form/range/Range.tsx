import { Component } from 'solid-js';

type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;

    onChange?: (v: number) => void;
}

export const Range: Component<Props> = (props) => {
    function change(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value, 10);
        props.onChange?.(value);
    }

    return (
        <input
            type="range"
            min={props.min || 0}
            max={props.max || 100}
            value={props.value}
            step={props.step}
            class="range"

            onInput={change}
        />
    );
};
