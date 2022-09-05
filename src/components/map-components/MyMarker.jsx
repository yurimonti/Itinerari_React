import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { IconDefault } from "leaflet/src/layer/marker/Icon.Default";
import { useNavigate } from "react-router-dom";

//Component that renders a Marker in a Map
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
  
  /**
   * 
   * @param {Object} poi types to render
   * @returns text types
   */
  function printTypes(poi) {
    let result = "";
    poi.types.forEach((t) => {
      result += t.name + " ";
    });
    return result;
  }

  /**
   * 
   * @param {Object} poi that contains info to render
   * @returns component that render info
   */
  function renderInfoOfAPoi(poi) {
    return (
      <>
        <div className="text-center text-sm">
          <h1 className="text-lg">{info.title}</h1>
          <h4>{info.types}</h4>
          <h4>{info.address}</h4>
          {info.price !== 0 && info.price !== null && (
            <h4>{"prezzo: " + info.price}</h4>
          )}
          <h4>{"tempo visita: " + info.visit}minuti</h4>
          <h4>{info.isOpen ? "APERTO" : "CHIUSO"}</h4>
        </div>
        <button
          onClick={() => {
            navigate("/pois/" + poi.id,{state:{poi:true}});
          }}
          className="border bg-red-400"
        >
          INFO
        </button>
        <button
          onClick={() => {
            popUpEffect.action(poi);
          }}
          className="border bg-sky-500 block float-right"
        >
          {popUpEffect?.name}
        </button>
      </>
    );
  }

  /**
   * 
   * @param {number[]} iconSize width and height to set to an icon marker
   * @param {*} image to set for a marker
   * @returns icon to set
   */
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

  /**
   * 
   * @returns standard Marker Icon of leaflet
   */
  function getStandardIcon() {
    return new IconDefault();
  }

  /**
   * icon according the type of a poi to render its marker
   */
  function adjustIcon(poi) {
    let typesPoi = poi.types.map((t) => {
      return t.name;
    });
    let result = "";
    switch (typesPoi[0]) {
      case "Basilica":
      case "Chiesa":
      case "Monastero":
      case "Cattedrale":
      case "Santuario":
      case "Tempio":
        result = getIcon([40, 40], "spiritual-marker.svg");
        break;
      case "Lago":
        result = getIcon([40, 40], "lake-marker.svg");
        break;
      case "Bosco":
      case "Giardino":
      case "Parco":
      case "Parco Giochi":
      case "Mulino":
        result = getIcon([40, 40], "natural-marker.svg");
        break;
      case "Biblioteca":
      case "Teatro":
      case "Statua":
      case "Museo":
        result = getIcon([40, 40], "cultural-marker.svg");
        break;
      case "Palazzo":
      case "Monumento":
      case "Piazza":
      case "Rocca":
        result = getIcon([40, 40], "architectural-marker.svg");
        break;
      case "Fontanella":
        result = getIcon([40, 40], "drinking-fountain-marker.svg");
        break;
      case "Ristorante":
      case "Enoteca":
        result = getIcon([40, 40], "ristorazione.svg");
        break;
      case "Sosta Macchine":
      case "Sosta Camper":
        result = getIcon([40, 40], "services.svg");
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
