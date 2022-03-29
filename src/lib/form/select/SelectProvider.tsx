import { createContext, useContext } from 'solid-js';

type SelectContextType<T = any> = {
    onOptionCheck: (value: T) => void;
}

export const SelectContext = createContext<SelectContextType>();

export const useSelect = () => useContext(SelectContext)!;