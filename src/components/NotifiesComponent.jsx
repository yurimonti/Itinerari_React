import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import { useMyContext } from "../utils/MyProvider";
import ModalComponent from "./ente-components/ModalComponent";

export default function NotifiesComponent({ role }) {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const styles =
    role === "ente"
      ? [
          { type: "aggiunta", color: "bg-green-200 border border-green-600" },
          { type: "modifica", color: "bg-yellow-200 border border-yellow-600" },
        ]
      : [
          { type: "accepted", color: "bg-green-200 border border-green-600" },
          { type: "pending", color: "bg-yellow-200 border border-yellow-600" },
          { type: "rejected", color: "bg-red-200 border border-red-600" },
        ];

  function getType(request) {
    return request.poiId === null ? styles[0] : styles[1];
  }

  function getStatus(request) {
    if (request.status === "REJECTED") return styles[2];
    if (request.status === "ACCEPTED") return styles[0];
    if (request.status === "PENDING") return styles[1];
  }

  function getRequestInfo(request) {
    return role === "ente" ? getType(request) : getStatus(request);
  }

  function getAllNotifies() {
    if (role === "ente") {
      publicInstance
        .get("/api/ente/notifies", {
          params: { username: "ente_camerino" },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.log(err));
    } //TODO:mettere mettodo per user
    else {
      publicInstance
        .get("/api/user/notifies", {
          params: { username: "an_user" },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.log(err));
    }
  }

  /**
   *
   * @param {boolean} toSet isAccepted
   * @param {number} id id of Request
   * @param {string} toRead string to set in the message
   */
  function setRequestTo(toSet, id, toRead) {
    if (role === "ente") {
      publicInstance
        .post("/api/ente/notifies", null, {
          //TODO:cambiare toSet isAccepted id in idPoiRequests
          params: { toSet: toSet, id: id },
        })
        .then((res) => {
          console.log(res.status);
          alert("richiesta " + toRead);
          setClicked((p) => {
            p = !p;
            return p;
          });
        })
        .catch((err) => console.log(err));
    } //TODO: mettere metodo per user
  }

  useEffect(() => {
    getAllNotifies();
    return () => {
      setRequests([]);
    };
  }, [clicked]);

  function printHours(day, hours) {
    if (hours.length === 0) return day + " - chiuso";
    if (hours.length === 2) return day + ": " + hours[0] + " - " + hours[1];
    if (hours.length === 4)
      return (
        day +
        ": " +
        hours[0] +
        " - " +
        hours[1] +
        " | " +
        hours[2] +
        " - " +
        hours[3]
      );
  }

  function renderhours(request) {
    let hours = [];
    hours.push(request.hours.monday);
    hours.push(request.hours.tuesday);
    hours.push(request.hours.wednesday);
    hours.push(request.hours.thursday);
    hours.push(request.hours.friday);
    hours.push(request.hours.saturday);
    hours.push(request.hours.sunday);
    return (
      <div>
        <p>{printHours("Lunedì", hours[0])}</p>
        <p>{printHours("Martedì", hours[1])}</p>
        <p>{printHours("Mercoledì", hours[2])}</p>
        <p>{printHours("Giovedì", hours[3])}</p>
        <p>{printHours("Venerdì", hours[4])}</p>
        <p>{printHours("Sabato", hours[5])}</p>
        <p>{printHours("Domenica", hours[6])}</p>
      </div>
    );
  }

  function printTypes(request){
    let result ="";
    request.types.forEach( t => {
      result += t.name+ " ";
    });
    return result;
  }

  function renderTags(request) {
    return request.tagValues.map((tv) => {
      return (
        <p key={tv.tag.name}>
          {tv.tag.name}:{" "}
          {tv.tag.isBooleanType ? tv.booleanValue.toString() : tv.stringValue.toString()}
        </p>
      );
    });
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Richieste
        </h2>
        {/* card container */}
        {requests.length ===0 ? <h3 className="flex justify-center m-auto">Nessuna Richiesta</h3> : (<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {/* card content */}
        {requests.map((requests) => (
          <button
            key={requests.id}
            onClick={() => {
              setOpen(true);
            }}
          >
            <div
              /* className="group relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none" */
              className={
                getRequestInfo(requests).color +
                " " +
                "group relative w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75"
              }
            >
              <h3 className="text-center mt-2">
                {getRequestInfo(requests).type.toUpperCase()}
              </h3>
              <div className="h-5 border-b-2 border-black" />

              {/* <div className="mt-4 flex justify-center"> */}
              <div className="mt-4 justify-center">
                {/* nome aggiunta */}
                <div className="m-2">
                  <h2 className="text-md text-black-700 text-center">
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    {requests.name}
                  </h2>
                  {/* <p className="mt-1 text-sm text-gray-500">{requests.color}</p> */}
                </div>
                <div className="m-2">
                  <h2 className="text-sm text-gray-700 text-center">
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    {requests.description.slice(0, 32) + "..."}
                  </h2>
                  {/* <p className="mt-1 text-sm text-gray-500">{requests.color}</p> */}
                </div>
                {/* <p className="text-sm font-medium text-gray-900">
                {requests.coordinate.lat + " " + requests.coordinate.lon}
              </p> */}
                <div className="m-2">
                  <h2 className="text-md text-black-700 text-center">
                    {"lat: " +
                      requests.coordinate.lat +
                      " lng: " +
                      requests.coordinate.lon}
                  </h2>
                  {/* <p className="mt-1 text-sm text-gray-500">{requests.color}</p> */}
                </div>
              </div>
              <div className="text-right justify-end">
                <h3 className="text-sm text-gray-700">
                  da {requests.username}
                </h3>
              </div>
            </div>
            <ModalComponent
              role={role}
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              deny={() => {
                setRequestTo(false, requests.id, "cancellata".toUpperCase());
                setOpen(false);
              }}
              accept={() => {
                setRequestTo(true, requests.id, "accettata".toUpperCase());
                setOpen(false);
              }}
              modify={() => {
                setOpen(false);
                navigate("/poi-form",{ state: { poi: requests } });
              }}
              title={getRequestInfo(requests).type.toUpperCase()}
            >
              <p>{requests?.name}</p>
              <p>{requests?.description}</p>
              <p>{printTypes(requests)}</p>
              <p>{"lat: " + requests?.coordinate?.lat}</p>
              <p>{"lng: " + requests?.coordinate?.lon}</p>
              {renderhours(requests)}
              {renderTags(requests)}
              <p>{"Da :" + requests?.username}</p>
            </ModalComponent>
          </button>
        ))}
      </div>)}
        
        
      </div>
    </div>
  );
}
