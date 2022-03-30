import { Component, createSignal } from 'solid-js';
import { Page } from '@views/pages/base/Page';
import { Menu, MenuOption } from '@components/menu';

type State = {
    show: boolean;
    reference?: HTMLElement;
}

export const MenuPage: Component = () => {
    const [state, setState] = createSignal<State>({
        show: false,
        reference: undefined
    });

    function setReference(reference: HTMLElement) {
        setState(state => ({
            ...state,
            reference
        }));
    }

    function toggle() {
        setState(state => {
            const show = !state.show;
            return {...state, show};
        });
    }

    return (
        <Page full class="p-4">
            <button
                class="btn btn-primary"
                ref={setReference}
                onClick={toggle}
            >
                Cars menu
            </button>
            <Menu
                isShow={state().show}
                reference={state().reference}
                onBackdropClick={toggle}
                minWidth={state().reference?.scrollWidth}
            >
                <MenuOption>Opel</MenuOption>
                <MenuOption>Audi</MenuOption>
                <MenuOption>Ford</MenuOption>
            </Menu>
        </Page>
    );
};