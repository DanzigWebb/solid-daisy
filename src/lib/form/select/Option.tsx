import { PropsWithChildren } from 'solid-js';
import { useSelect } from './SelectProvider';

type Props<T = any> = {
    value: T;
}

export const Option = <T extends any>(props: PropsWithChildren<Props<T>>) => {

    const select = useSelect();

    return (
        <li onClick={() => select.onOptionCheck(props.value)}>
            <div class="cursor-pointer p-2 transition-all hover:bg-gray-300">
                {props.children}
            </div>
        </li>
    );
};