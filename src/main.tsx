import './style.css'
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {StrictMode} from "react";
import Root, {loader as rootLoader, action as rootAction,} from "./routes/root";
import ErrorPage from "./pages/error/error-page";
import Contact, {loader as contactLoader } from "./routes/contact";
import EditContact, {action as editAction} from "./routes/edit";
import {action as destroyAction} from './routes/destroy';
import Index from "./routes";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

const router = createBrowserRouter([
    {
        path: "/",
        action: rootAction,
        loader: rootLoader,
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <Index /> },
            {
                path: "contacts/:contactId",
                loader: contactLoader,
                element: <Contact />,
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
            },
        ]
    },

]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
