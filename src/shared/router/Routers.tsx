import { Routes, Route } from 'solid-app-router';
import { Component } from 'solid-js';
import {
    BtnGroupPage,
    HomePage,
    MenuPage,
    NotFound,
    RangePage,
    SelectPage,
    TabsPage
} from '@views/pages';
import { RoutersEnum } from '@shared/router/Routers.enum';

export const Routers: Component = () => {

    return (
        <Routes>
            <Route path={`/`} element={<HomePage/>}/>
            <Route path={`/${RoutersEnum.FORM_SELECT}`} element={<SelectPage/>}/>
            <Route path={`/${RoutersEnum.MENU}`} element={<MenuPage/>}/>
            <Route path={`/${RoutersEnum.TABS}`} element={<TabsPage/>}/>
            <Route path={`/${RoutersEnum.BTN_GROUPS}`} element={<BtnGroupPage/>}/>
            <Route path={`/${RoutersEnum.RANGE}`} element={<RangePage/>}/>

            <Route path="/*all" element={<NotFound/>}/>
        </Routes>
    );
};
