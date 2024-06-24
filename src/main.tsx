import './style.css'
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {StrictMode} from "react";
import Root, {loader as rootLoader, action as rootAction,} from "./routes/root";
import ErrorPage from "./pages/error/error-page";
import Contact, {loader as contactLoader } from "./routes/contact";

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
            {
                path: "contacts/:contactId",
                loader: contactLoader,
                element: <Contact />,
            }
        ]
    },

]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
