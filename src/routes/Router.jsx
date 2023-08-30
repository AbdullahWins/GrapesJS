import { createBrowserRouter } from "react-router-dom";
import GrapesJsEditor from "../pages/GrapesJsEditor";
import ToDo from "../pages/ToDo";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/drag",
        element: <ToDo></ToDo>,
      },
      {
        path: "/grapes",
        element: <GrapesJsEditor></GrapesJsEditor>,
      },
    ],
  },
  {
    path: "*",
    element: (
      <h2 className="font-black py-6 text-3xl text-red-600 text-center">
        Page Not Found!
      </h2>
    ),
  },
]);