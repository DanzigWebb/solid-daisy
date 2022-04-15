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
                const value = (e.target as FormControl).value as unknown as Value;
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

    const watch = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        name: Name
    ): Observable<Value> => {
        console.log(refs, name);
        return valueState.asObservable().pipe(
            map((controls) => controls[name] as Value),
            distinctUntilChanged()
        );
    };

    return {
        register,
        setValue,
        getValue,
        setError,
        submit,
        watch,
        errors,
    };
}
