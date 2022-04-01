import { Component, createSignal } from 'solid-js';
import { Page } from '@views/pages/base/Page';
import { Range } from '@components/form/range/Range';

export const RangePage: Component = () => {
    const [value, setValue] = createSignal(0);

    return (
        <Page full class="p-4">
            <div class="w-96">
                <input
                    type="text"
                    placeholder="Set value"
                    class="input input-bordered w-full"
                    value={value()}
                    onInput={e => setValue(Number((e.target as HTMLInputElement).value))}
                />
                <p class="py-4">Value: {value()}</p>
                <Range value={value()} onChange={setValue}/>
            </div>
        </Page>
    );
};
