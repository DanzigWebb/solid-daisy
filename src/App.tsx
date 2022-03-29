import type { Component } from 'solid-js';
import { Select } from './lib/form/select/Select';
import { Option } from './lib/form/select/Option';

const App: Component = () => {

    function onSelectChange(v: string) {
        console.log('onSelectChange', v);
    }

    return (
        <div class="p-4">
            <div class="max-w-xs">
                <Select
                    placeholder="Select"
                    onChange={onSelectChange}
                >
                    <Option value={'Rat'}>Rat</Option>
                    <Option value={'Milk'}>Milk</Option>
                    <Option value={'Car'}>Car</Option>
                    <Option value={'Moon'}>Moon</Option>
                </Select>
            </div>
        </div>
    );
};

export default App;
