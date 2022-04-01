import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import { RoutersEnum } from '@shared/router/Routers.enum';

export const Drawer: Component = (props) => {
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
            <div class="drawer-content flex flex-col">
                {props.children}
            </div>
            <div class="drawer-side bg-base-200 shadow">
                <label for="my-drawer-2" class="drawer-overlay"/>
                <div className="w-60">
                    <div
                        class="font-title p-4 text-primary inline-flex text-lg transition-all duration-200 md:text-3xl font-bold"
                    >
                        <span class="lowercase">daisy</span>
                        <span class="text-base-content uppercase">UI</span>
                    </div>

                    <Menu>
                        <MenuDivider/>
                        <MenuTitle>Actions</MenuTitle>
                        <MenuLink href={`/${RoutersEnum.MODALS}`}>Modal</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Form</MenuTitle>
                        <MenuLink href={`/${RoutersEnum.FORM_SELECT}`}>Select</MenuLink>
                        <MenuLink href={`/${RoutersEnum.FORM_INPUT}`}>Input</MenuLink>
                        <MenuLink href={`/${RoutersEnum.RANGE}`}>Range</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Navigation</MenuTitle>
                        <MenuLink href={`/${RoutersEnum.MENU}`}>Menu</MenuLink>
                        <MenuLink href={`/${RoutersEnum.TABS}`}>Tabs</MenuLink>
                        <MenuLink href={`/${RoutersEnum.BTN_GROUPS}`}>Buttons group</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Data view</MenuTitle>
                        <MenuLink href={`/${RoutersEnum.TOOLTIP}`}>Tooltip</MenuLink>
                        <MenuDivider/>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

const Menu: Component = (props) => (
    <ul class="menu menu-compact gap-1 flex flex-col p-0 px-2">
        {props.children}
    </ul>
);

const MenuTitle: Component = (props) => (
    <li class="menu-title">
        <span>{props.children}</span>
    </li>
);

const MenuLink: Component<{ href: string }> = (props) => (
    <li>
        <Link href={props.href}>{props.children}</Link>
    </li>
);

const MenuDivider = () => <li/>;
