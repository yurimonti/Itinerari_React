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
import CreateItineraryPage from "../pages/CreateItineraryPage";
import PoiDescriptionPage from "../pages/PoiDescriptionPage";

export default function MyRoutes() {
  const role = useMyContext();
  //FIXME: rivedere perche non funziona
  //TODO: completare
  const routes =
    role === "user"
      ? useRoutes([
          { path: "/", element: <HomePage /> },
          {
            path: "map",
            element: (
              <MapComponent
                renderAll
                zoom={15}
                center={[43.13629626765269, 13.06711823898054]}
              />
            ),
          },
          { path: "pois/:id", element: <PoiDescriptionPage /> },
          { path: "poi-form", element: <ProvaForm role="user" /> },
          { path: "poi-form/poi/:id", element: <ProvaForm role="user" /> },
          { path: "poi-form/request/:id", element: <ProvaForm role="user" /> },
          { path: "notifies", element: <NotifiesComponent role="user" /> },
          { path: "login", element: <LoginForm /> },
          { path: "itinerary", element: <CreateItineraryPage role="user"/> },
          { path: "itineraries", element: <ItinerariesPage role="user" /> },
          { path: "itineraries/:id", element: <ItineraryDescriptionPage /> },
          { path: "*", element: <ErrorPage /> },
        ])
      : useRoutes([
          { path: "/", element: <HomePage /> },
          {
            path: "map",
            element: (
              <MapComponent
                renderAll
                zoom={15}
                center={[43.13629626765269, 13.06711823898054]}
              />
            ),
          },
          { path: "/pois/:id", element: <PoiDescriptionPage /> },
          { path: "poi-form", element: <ProvaForm role="ente" /> },
          { path: "poi-form/poi/:id", element: <ProvaForm role="ente" /> },
          { path: "poi-form/request/:id", element: <ProvaForm role="ente" /> },
          { path: "notifies", element: <NotifiesComponent role="ente" /> },
          { path: "login", element: <LoginForm /> },
          { path: "itinerary", element: <CreateItineraryPage role="ente"/> },
          { path: "itineraries", element: <ItinerariesPage role="ente" /> },
          { path: "itineraries/:id", element: <ItineraryDescriptionPage /> },
          { path: "itinerary-request/:id", element: <ItineraryDescriptionPage /> },
          { path: "*", element: <ErrorPage /> },
        ]);

  return routes;
}
