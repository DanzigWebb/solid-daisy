import { Component, createSignal, onCleanup } from 'solid-js';
import { Page } from '../../base/Page';
import { createForm, Validators } from '../../../../../../simple-forms/src/form';
import { Input, Select, Option, FormField, FormError } from '../../../../../../src/lib';

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

    const {control, setValue, watch, errors, reset} = createForm<Controls>({
        defaultValues,
        validators: {
            name: [Validators.required()]
        }
    });

    const [controls, setControls] = createSignal<Partial<Controls>>(defaultValues);

    const form$ = watch().subscribe((data) => {
        setControls(data);
    });

    onCleanup(() => {
        form$.unsubscribe();
    });

    function setFormValue() {
        setValue({
            name: 'Alexander',
            phone: '+7 900 024 78 90',
            email: 'em@mail.com',
            female: 'man'
        });
    }

    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Input</h2>
            <br/>

            <div className="flex gap-2">
                <div class="flex p-2 flex-col gap-2 w-96">
                    <FormField>
                        <Input
                            autocomplete="off"
                            placeholder="Name"
                            bordered
                            error={!!errors.name}
                            {...control('name')}
                        />

                        <FormError show={!!errors.name}>Required field</FormError>
                    </FormField>

                    <FormField>
                        <Input
                            autocomplete="off"
                            placeholder="Email"
                            bordered
                            {...control('email')}
                        />

                        <FormError show={!!errors.email}>Required field</FormError>
                    </FormField>


                    <FormField>
                        <Input
                            autocomplete="off"
                            placeholder="Phone"
                            bordered
                            {...control('phone')}
                        />

                        <FormError show={!!errors.phone}>Required field</FormError>
                    </FormField>

                    <FormField>
                        <Select
                            placeholder="Female"
                            bordered
                            {...control('female')}
                        >
                            <Option value="man">Man</Option>
                            <Option value="woman">Woman</Option>
                        </Select>
                    </FormField>

                    <div class="flex gap-1">
                        <button class="btn" onClick={setFormValue}>Autocomplete</button>
                        <button class="btn" onClick={() => reset()}>Reset</button>
                    </div>
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
