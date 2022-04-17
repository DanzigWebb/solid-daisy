import { createStore, reconcile } from 'solid-js/store';
import {
    FormControl,
    FormErrorType,
    FormOptions,
    FormValidatorsOption,
    RegisterOptions,
} from './';
import {
    CUSTOM_EVENT_NAME,
    Entries,
    getControlValue,
    setControlValue,
    validateControl,
    validateForm
} from './utils';
import { distinctUntilChanged, map, Observable, Subject } from 'rxjs';

const customEvent = new CustomEvent(CUSTOM_EVENT_NAME);

export function createForm<Controls extends {}>(options: FormOptions<Controls> = {}) {
    const refs: { [key in keyof Controls]?: FormControl } = {};
    const [errors, setErrors] = createStore<FormErrorType<Controls>>({});

    const valueState = new Subject<Controls>();

    /**
     * Get all values of control
     */
    const getValues = (): Controls => {
        const controls: Partial<Controls> = {};
        Entries(refs).forEach(([name, controlRef]) => (
            controls[name] = controlRef
                ? getControlValue(controlRef!)
                : ''
        ));
        return controls as Controls;
    };

    /**
     * Registration control
     */
    const register = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        name: Name,
        registerOptions: RegisterOptions<Controls> = {}
    ) => {

        /**
         * Init validators for control
         */
        if (registerOptions.validators) {
            if (options.validators) {
                options.validators[name] = registerOptions.validators;
            } else {
                options.validators = {} as FormValidatorsOption<Controls>;
                options.validators[name] = registerOptions.validators;
            }
        }

        return {
            ref: (ref: FormControl) => {
                const controlRef = (refs[name] = ref);

                /**
                 * Set default value to control with init register props
                 */
                const {defaultValues} = options;
                if (defaultValues && defaultValues[name]) {
                    // @ts-ignore
                    setValue(name, defaultValues[name]!);
                }

                return controlRef;
            },
            onInput: (e: Event) => {
                const type = refs[name]?.type;
                let value;
                if (type === 'abstractControl') {
                    value = e as unknown as Value;
                } else {
                    value = (e.target as FormControl).value as unknown as Value;
                }

                onControlChange(value, name);
            },
            name
        };
    };

    const onControlChange = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        value: Value,
        name: Name
    ) => {
        const errorMessage = validateControl(name, value, options.validators) as string;
        const clone = reconcile(errors);
        const state = {...clone, [name]: errorMessage};
        setErrors(state);

        if (refs[name]?.type === 'abstractControl') {
            setValue(name, value);
        }
        const values = getValues();
        valueState.next(values);
    };

    /**
     * Set error to control
     */
    const setError = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        control: Name,
        message: string,
    ) => {
        const clone = reconcile(errors);
        setErrors({...clone, [control]: message});
    };

    /**
     * Set new value to registered control
     */
    const setValue = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        name: Name,
        value: Value
    ) => setControlValue(refs[name]!, value, customEvent);

    /**
     * Get value of registered control
     */
    const getValue = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        name: Name
    ) => getControlValue(refs[name]!);

    /**
     * @internal
     * Validate current controls
     */
    const _validate = (values: Controls) => validateForm(values, options.validators, setErrors);

    /**
     * Form submit wrapper with validation
     */
    const submit = (e?: Event) => {
        e?.preventDefault();
        const onSubmit = options.onSubmit;
        const values = getValues();

        if (_validate(values) && onSubmit) {
            onSubmit(values);
        }
    };

    /*
    * Observable of controls changes
    */
    const valueChange = (): Observable<Controls> => {
        return valueState.asObservable();
    };

    /*
    * Observable of control
    */
    const watch = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        name: Name
    ): Observable<Value> => {
        return valueChange().pipe(
            map((controls) => controls[name] as Value),
            distinctUntilChanged()
        );
    };

    /*
    * Reset all controls
    */
    const reset = <Name extends keyof Partial<Controls>>() => {
        Object.values(refs).forEach(control => {
            setControlValue(control as FormControl, null, customEvent);
        });

        const values = getValues();
        valueState.next(values);
        clearErrors();
    };

    /*
    * Reset value of Control by name
    */
    const resetControl = <Name extends keyof Partial<Controls>>(
        name: Name
    ) => {
        const control = refs[name];
        if (control) {
            setControlValue(control as FormControl, null, customEvent);

            const values = getValues();
            valueState.next(values);
            clearError(name);
        }
    };

    /*
    * Clear error of Control
    */
    const clearError = <Name extends keyof Partial<Controls>>(
        name: Name,
    ) => {
        const clone = reconcile(errors);
        setErrors({...clone, [name]: null});
    };

    /*
    * Clear all errors of controls
    */
    const clearErrors = <Name extends keyof Partial<Controls>>() => {
        // @ts-ignore
        const clone = {...errors} as FormErrorType<Controls>;
        Object.keys(clone).forEach((key) => {
            clone[key as Name] = null;
        });
        setErrors(clone);
    };

    return {
        register,

        setValue,
        getValue,
        getValues,

        setError,
        clearError,
        clearErrors,

        reset,
        resetControl,

        submit,

        watch,
        valueChange,

        errors,
    };
}
