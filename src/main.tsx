import './style.css'
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {StrictMode} from "react";
import Root from "./routes/root";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import ErrorPage from "./pages/error/error-page";
import Contact from "./routes/contact";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "contacts/:contactId",
        element: <Contact />,
    },
]);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
