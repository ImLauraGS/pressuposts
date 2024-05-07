import {
    createBrowserRouter
  } from "react-router-dom";
import Home from "../pages/Home";
import Pressupost from "../pages/Pressupost";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/pressupost",
        element: <Pressupost />,
    },
  ]);