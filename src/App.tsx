import type { Component } from 'solid-js';

const App: Component = () => {

    function onSelectChange(v: string) {
        console.log('onSelectChange', v);
    }

    return (
        <div class="p-4">
            <div class="max-w-xs">

            </div>
        </div>
    );
};

export default App;
