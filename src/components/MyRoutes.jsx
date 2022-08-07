import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapComponent from "./map-components/MapComponent";
import PoiFormComponent from "./ente-components/PoiFormComponent";
import LoginForm from "./LoginForm";
import { useMyContext } from "../utils/MyProvider";
import NotifiesComponent from "./NotifiesComponent";
import ProvaForm from "./prova/ProvaForm";
import DescriptionComponent from "./DescriptionComponent";
import ItinerariesComponent from "./ItinerariesComponent";
import DescriptionLists from "./DescriptionLists";
import ErrorPage from "../pages/ErrorPage";

export default function MyRoutes() {
  const role = useMyContext();
  //FIXME: rivedere perche non funziona
  //TODO: completare
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "map", element: <MapComponent /> },
    { path: "poi-form", element: <ProvaForm role={role} /> },
    { path: "notifies", element: <NotifiesComponent role={role} /> },
    { path: "login", element: <LoginForm /> },
    { path: "itineraries",element: <ItinerariesComponent role={"ente"} />},
    { path:'/itineraries/:id',element:<DescriptionLists />}, 
    { path:'*',element:<ErrorPage />}, 
    role === "ente" && { path: "itinerary", element: <MapComponent /> },
  ]);

  return routes;
}
