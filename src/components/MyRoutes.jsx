import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapComponent from "./map-components/MapComponent";
import PoiFormComponent from "./ente-components/PoiFormComponent";
import LoginForm from "../pages/LoginForm";
import { useMyContext } from "../utils/MyProvider";
import NotifiesComponent from "./NotifiesComponent";
import ProvaForm from "./ProvaForm";
import DescriptionComponent from "./DescriptionComponent";
import ItinerariesPage from "../pages/ItinerariesPage";
import ItineraryDescriptionPage from "../pages/ItineraryDescriptionPage";
import ErrorPage from "../pages/ErrorPage";
import CreateItinerary from "./CreateItinerary";

export default function MyRoutes() {
  const role = useMyContext();
  //FIXME: rivedere perche non funziona
  //TODO: completare
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "map", element: <MapComponent renderAll zoom={15} center={[43.13629626765269, 13.06711823898054]}/> },
    { path: "poi-form", element: <ProvaForm role={role} /> },
    { path: "notifies", element: <NotifiesComponent role={role} /> },
    { path: "login", element: <LoginForm /> },
    { path:"itinerary",element:<CreateItinerary />},
    { path: "itineraries",element: <ItinerariesPage role={"ente"} />},
    { path:'/itineraries/:id',element:<ItineraryDescriptionPage />}, 
    { path:'*',element:<ErrorPage />},
    role === "ente" && { path: "itinerary", element: <MapComponent /> },
  ]);

  return routes;
}
