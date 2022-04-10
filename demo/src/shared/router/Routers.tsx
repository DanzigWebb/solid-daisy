import { Routes, Route } from 'solid-app-router';
import { Component } from 'solid-js';
import { BtnGroupPage, HomePage, MenuPage, NotFound, RangePage, SelectPage, TabsPage } from '../../views/pages';
import { RoutersEnum } from './Routers.enum';
import { ModalPage } from '../../views/pages/actions';
import { TooltipPage } from '../../views/pages/data/tooltip/TooltipPage';
import { StepsPage } from '../../views/pages/navigation/steps/StepsPage';


export const Routers: Component = () => {

    return (
        <Routes>
            <Route path={`/`} element={<HomePage/>}/>
            <Route path={`/${RoutersEnum.FORM_SELECT}`} element={<SelectPage/>}/>
            <Route path={`/${RoutersEnum.MENU}`} element={<MenuPage/>}/>
            <Route path={`/${RoutersEnum.TABS}`} element={<TabsPage/>}/>
            <Route path={`/${RoutersEnum.BTN_GROUPS}`} element={<BtnGroupPage/>}/>
            <Route path={`/${RoutersEnum.RANGE}`} element={<RangePage/>}/>
            <Route path={`/${RoutersEnum.MODALS}`} element={<ModalPage/>}/>
            <Route path={`/${RoutersEnum.TOOLTIP}`} element={<TooltipPage/>}/>
            <Route path={`/${RoutersEnum.STEPS}`} element={<StepsPage/>}/>

            <Route path="/*all" element={<NotFound/>}/>
        </Routes>
    );
};
