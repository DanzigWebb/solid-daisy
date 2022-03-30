import { Routes, Route } from 'solid-app-router';
import { Component } from 'solid-js';
import { HomePage, NotFound } from '@views/pages';

export const Routers: Component = () => {

    return (
        <Routes>
            <Route path={`/`} element={<HomePage/>}/>

            <Route path="/*all" element={<NotFound/>}/>
        </Routes>
    );
};