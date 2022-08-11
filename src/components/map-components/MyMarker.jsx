import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { IconDefault } from "leaflet/src/layer/marker/Icon.Default";
import { useNavigate } from "react-router-dom";


const MyMarker = ({ poi, popup, isPoiIcon, icon, popUpEffect }) => {
  const navigate = useNavigate();

  const info = {
    title: poi.name,
    subtitle: poi.description,
    isOpen: poi?.hours?.isOpen,
    visit: poi.timeToVisit,
    price: poi.ticketPrice,
    types: printTypes(poi),
    address: poi?.address?.street + " " + poi?.address?.number,
    email: poi?.contact?.email,
    fax: poi?.contact?.fax,
    phone: poi?.contact?.cellNumber,
  };

  function printTypes(poi) {
    let result = "";
    poi.types.forEach((t) => {
      result += t.name + " ";
    });
    return result;
  }

  function renderInfoOfAPoi(poi) {
    return (
      <>
        <div className="text-center text-sm">
          <h1 className="text-lg">{info.title}</h1>
          <h4>{info.types}</h4>
          <h4>{info.address}</h4>
          {/* <h4>{info.subtitle.slice(0, 32) + "..."}</h4> */}
          {info.price !== 0 && info.price !== null && (
            <h4>{"prezzo: " + info.price}</h4>
          )}
          <h4>{"tempo visita: " + info.visit}minuti</h4>
          <h4>{info.isOpen ? "APERTO" : "CHIUSO"}</h4>
        </div>
        <button
          onClick={() => {
            navigate("/pois/" + poi.id);
          }}
          className="border bg-red-400"
        >
          INFO
        </button>
        <button
          onClick={()=>{popUpEffect.action(poi)}}
          className="border bg-sky-500 block float-right"
        >
          {popUpEffect?.name}
        </button>
      </>
    );
  }

  function getIcon(iconSize, image) {
    return L.icon({
      iconUrl: require("../../static/" + image),
      iconSize: iconSize,
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
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
        result = getIcon([35, 35], "christian-cross.png");
        break;
      case "Bosco":
      case "Giardino":
      case "Parco":
        result = getIcon([38, 38], "park.svg");
        break;
      default:
        result = getStandardIcon();
        break;
    }
    return result;
  }

  return (
    <>
      <Marker
        position={[poi.coordinate.lat, poi.coordinate.lon]}
        icon={isPoiIcon ? adjustIcon(poi) : getStandardIcon()}
      >
        {popup && (
          <Popup maxWidth="300" minWidth="100" maxHeight="200">
            {renderInfoOfAPoi(poi)}
          </Popup>
        )}
      </Marker>
    </>
  );
};

export default MyMarker;
