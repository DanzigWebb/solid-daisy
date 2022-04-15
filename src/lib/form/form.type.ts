import { Accessor, Setter } from 'solid-js';

export type FormControlAbstract = {
    value: Accessor<any>;
    setValue: Setter<any>;
    type: string;
}

export type FormControl = HTMLInputElement | HTMLSelectElement | FormControlAbstract;

export type FormErrorType<Controls> = { [Name in keyof Controls]?: string };

export type FormValidator<T> = (value: T | undefined | null) => string | void;

export type FormValidatorsOption<Controls> = {
    [Name in keyof Partial<Controls>]: FormValidator<Controls[Name]> | Array<FormValidator<Controls[Name]>>;
};

export interface FormOptions<Controls> {
    defaultValues?: Partial<Controls>;
    validators?: FormValidatorsOption<Controls>;
    onSubmit?: (values: Controls) => void | Promise<void>;
}

export type RegisterOptions<Controls> = {
    validators?: Array<FormValidator<Controls[keyof Partial<Controls>]>>;
}

export type FormRegisterProps = {
    value?: Accessor<any>;
    onInput: (v: any) => void;
    ref: (c: FormControl) => FormControl;
}
