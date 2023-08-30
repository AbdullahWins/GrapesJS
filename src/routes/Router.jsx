import { createBrowserRouter } from "react-router-dom";
import GrapesJsEditor from "../pages/GrapesJsEditor";
import ToDo from "../pages/ToDo";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import ShowGrapes from "../pages/ShowGrapes";

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
      {
        path: "/grapes/:id",
        element: <ShowGrapes></ShowGrapes>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.API_BASE_URL}/items/${params.id}`),
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