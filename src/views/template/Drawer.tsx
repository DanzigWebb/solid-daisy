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
            <div class="drawer-side bg-base-200">
                <label for="my-drawer-2" class="drawer-overlay"/>
                <div className="w-60">
                    <div
                        class="font-title p-4 text-primary inline-flex text-lg transition-all duration-200 md:text-3xl font-bold"
                    >
                        <span class="lowercase">daisy</span>
                        <span class="text-base-content uppercase">UI</span>
                    </div>

                    <ul class="menu menu-compact flex flex-col p-0 px-2">
                        <li/>
                        <li class="menu-title">
                            <span>Form</span>
                        </li>
                        <li>
                            <Link href={`/${RoutersEnum.FORM_SELECT}`}>Select</Link>
                        </li>
                        <li>
                            <Link href={`/${RoutersEnum.FORM_INPUT}`}>Input</Link>
                        </li>
                        <li/>
                    </ul>
                </div>
            </div>
        </div>
    );
};