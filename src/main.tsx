import './style.css'
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {StrictMode} from "react";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
