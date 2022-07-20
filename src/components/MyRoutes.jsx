import { useRoutes } from "react-router-dom";
import HomePage from "./HomePage"
import MapComponent from "./map-components/MapComponent";
import PoiFormComponent from "./ente-components/PoiFormComponent";
import LoginForm from './LoginForm';
import { useMyContext } from "../utils/MyProvider";
import NotifiesComponent from "./NotifiesComponent";
import ProvaForm from "./prova/ProvaForm";

export default function MyRoutes() {
  const role = useMyContext();
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "map", element: <MapComponent /> },
    { path: "poi-form", element: <ProvaForm role={role}/> },
    { path: "notifies", element: <NotifiesComponent role={role}/> },
    { path: "login", element: <LoginForm /> },
  ]);

  return routes;
}
