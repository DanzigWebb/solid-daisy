import { Component, createSignal, onCleanup } from 'solid-js';
import { Page } from '../../base/Page';
import {
    AbstractControl,
    createForm,
    FormError,
    FormField,
    Input,
    Option,
    Select,
    Validators
} from '../../../../../../src/lib';
import { Subject, takeUntil } from 'rxjs';

type Controls = {
    name: string,
    email: string,
    phone: string,
    female: string,
}

const defaultValues: Controls = {
    name: '',
    email: '',
    phone: '',
    female: '',
};

export const FormPage: Component = () => {
    const [controls, setControls] = createSignal(defaultValues);
    const {register, valueChange, errors, reset} = createForm<Controls>({
        defaultValues
    });

    const destroy$ = new Subject();

    valueChange()
        .pipe(takeUntil(destroy$))
        .subscribe((controls) => setControls(controls));


    onCleanup(() => {
        destroy$.next(null);
        destroy$.complete();
    });

    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Input</h2>
            <br/>

            <div class="flex">
                <div class="card gap-0 w-96 p-2">
                    <FormField>
                        <AbstractControl {...register('name', {validators: [Validators.required()]})}>
                            {(state) => (
                                <Input
                                    autocomplete="off"
                                    value={state.value()}
                                    onInput={e => state.onInput?.((e.target as HTMLInputElement).value)}
                                    name={state.name}
                                    error={!!errors.name}
                                    placeholder="Name"
                                    bordered
                                />
                            )}
                        </AbstractControl>

                        <FormError show={!!errors.name}>Required field</FormError>
                    </FormField>

                    <FormField>
                        <AbstractControl {...register('email', {validators: [Validators.required(), Validators.emailValidator()]})}>
                            {(state) => (
                                <Input
                                    autocomplete="off"
                                    value={state.value()}
                                    onInput={e => state.onInput?.((e.target as HTMLInputElement).value)}
                                    name={state.name}
                                    error={!!errors.email}
                                    placeholder="Email"
                                    bordered
                                />
                            )}
                        </AbstractControl>

                        <FormError show={!!errors.email}>{errors.email}</FormError>
                    </FormField>

                    <FormField>
                        <AbstractControl {...register('phone')}>
                            {(state) => (
                                <Input
                                    autocomplete="off"
                                    value={state.value()}
                                    onInput={e => state.onInput?.((e.target as HTMLInputElement).value)}
                                    name={state.name}
                                    placeholder="Phone"
                                    bordered
                                />
                            )}
                        </AbstractControl>
                    </FormField>

                    <AbstractControl {...register('female')}>
                        {(state) => (
                            <Select
                                onInput={state.onInput}
                                value={state.value}
                                name={state.name}
                                placeholder="Female"
                                bordered
                            >
                                <Option value="man">Man</Option>
                                <Option value="woman">Woman</Option>
                            </Select>
                        )}
                    </AbstractControl>

                    <button class="btn" onClick={reset}>Reset</button>
                </div>
                <pre>
                    {Object.entries(controls()).map(([key, value]) => (
                        <div class="grid grid-cols-2 gap-2">
                            <p>{key}:</p>
                            <p>{value as string}</p>
                        </div>
                    ))}
                </pre>
            </div>
        </Page>
    );
};
