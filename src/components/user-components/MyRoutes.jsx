import { useRoutes } from "react-router-dom";
import HomePage from "../HomePage"
import MapComponent from "../map-components/MapComponent";
import ExampleComponent from "../ExampleComponent";
import ItinerarySection from "../ItinerarySection";
import LoginForm from '../LoginForm';

export default function MyRoutes() {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "map", element: <MapComponent /> },
    { path: "poi-form", element: <ExampleComponent /> },
    { path: "itinerary", element: <ItinerarySection /> },
    { path: "login", element: <LoginForm /> },
  ]);

  return routes;
}
