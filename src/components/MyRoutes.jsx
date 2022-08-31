import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapComponent from "./map-components/MapComponent";
//import LoginForm from "../pages/LoginForm";
import { useUserContext } from "../utils/UserInfoProvider";
import NotifiesComponent from "./poi-components/NotifiesComponent";
import FormPage from "../pages/FormPage";
import ItinerariesPage from "../pages/ItinerariesPage";
import ItineraryDescriptionPage from "../pages/ItineraryDescriptionPage";
import ErrorPage from "../pages/ErrorPage";
import CreateItineraryPage from "../pages/CreateItineraryPage";
import PoiDescriptionPage from "../pages/PoiDescriptionPage";
import UserSelectorPage from "./UserSelectorPage";


export default function MyRoutes() {
  const { isAuth, role } = useUserContext();
  console.log(isAuth);
  const routes =
    isAuth === true
      ? role === "user"
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
            { path: "pois/:id", element: <PoiDescriptionPage role="user" /> },
            { path: "poi-form", element: <FormPage role="user" /> },
            { path: "poi-form/poi/:id", element: <FormPage role="user" /> },
            { path: "poi-form/request/:id", element: <FormPage role="user" /> },
            { path: "notifies", element: <NotifiesComponent role="user" /> },
            { path: "login", element: <UserSelectorPage /> },
            { path: "itinerary", element: <CreateItineraryPage role="user" /> },
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
            { path: "/pois/:id", element: <PoiDescriptionPage role="ente" /> },
            { path: "poi-form", element: <FormPage role="ente" /> },
            { path: "poi-form/poi/:id", element: <FormPage role="ente" /> },
            { path: "poi-form/request/:id", element: <FormPage role="ente" /> },
            { path: "notifies", element: <NotifiesComponent role="ente" /> },
            { path: "login", element: <UserSelectorPage /> },
            { path: "itinerary", element: <CreateItineraryPage role="ente" /> },
            { path: "itineraries", element: <ItinerariesPage role="ente" /> },
            { path: "itineraries/:id", element: <ItineraryDescriptionPage /> },
            {
              path: "itinerary-request/:id",
              element: <ItineraryDescriptionPage />,
            },
            { path: "*", element: <ErrorPage /> },
          ])
      : useRoutes([
          { path: "/", element: <HomePage /> },
          { path: "login", element: <UserSelectorPage /> },
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
          { path: "*", element: <ErrorPage /> },
        ]);

  return routes;
}
