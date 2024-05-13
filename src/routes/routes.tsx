import {
    createBrowserRouter
  } from "react-router-dom";
import Home from "../pages/Home";
import Pressupost from "../pages/Pressupost";
import PressupostDetail from "../pages/PressupostDetail";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/pressupost",
        element: <Pressupost />,
    },
    {
      path: "/pressupostdetail",
      element: <PressupostDetail />,
    },
  ]);