import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { IconDefault } from "leaflet/src/layer/marker/Icon.Default";

const MyMarker = ({ poi, popup, isPoiIcon, icon }) => {

  function renderInfoOfAPoi(poi) {
    let info = { title: poi.name, subtitle: poi.description };
    return (
      <>
        <h1>{info.title}</h1>
        <h4>{info.subtitle}</h4>
      </>
    );
  }

  function getIcon(iconSize, image) {
    return L.icon({
      iconUrl: require("../../static/" + image),
      iconSize: iconSize,
    });
  }

  function getStandardIcon() {
    return new IconDefault();
  }

  function adjustIcon(poi) {
    let typesPoi = poi.types.map((t) => {
      return t.name;
    });
    let result = "";
    switch (typesPoi[0]) {
      case "Basilica":
      case "Chiesa":
      case "Monastero":
        result = getIcon([30, 30], "christian-cross.png");
        break;
      case "Bosco":
      case "Giardino":
      case "Parco":
        result = getIcon([30, 30], "park.svg");
        break;
      default:
        result = getStandardIcon();
        break;
    }
    return result;
  }

  return (
    <Marker
      position={[poi.coordinate.lat, poi.coordinate.lon]}
      icon={isPoiIcon ? adjustIcon(poi) :getStandardIcon()}
    >
      {popup || <Popup>{renderInfoOfAPoi(poi)}</Popup>}
    </Marker>
  );
};

export default MyMarker;
