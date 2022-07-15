import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ModalComponent from "./ente-components/ModalComponent";

export default function NotifiesComponent() {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const styles = [
    { type: "aggiunta", color: "bg-green-200 border border-green-600" },
    { type: "modifica", color: "bg-yellow-200 border border-yellow-600" },
  ];

  function getType(request) {
    return request.poiId === null ? styles[0] : styles[1];
  }

  function getAllNotifies() {
    publicInstance
      .get("/api/ente/notifies", {
        params: { username: "ente_camerino" },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }

  /**
   *
   * @param {boolean} toSet isAccepted
   * @param {number} id id of Request
   * @param {string} toRead string to set in the message
   */
  function setRequestTo(toSet, id, toRead) {
    publicInstance
      .post("/api/ente/notifies", null, {
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
    hours.push(request.timeSlot.monday);
    hours.push(request.timeSlot.tuesday);
    hours.push(request.timeSlot.wednesday);
    hours.push(request.timeSlot.thursday);
    hours.push(request.timeSlot.friday);
    hours.push(request.timeSlot.saturday);
    hours.push(request.timeSlot.sunday);
    return(
    <div>
      <p>{printHours("Lunedì", hours[0])}</p>
      <p>{printHours("Martedì", hours[1])}</p>
      <p>{printHours("Mercoledì", hours[2])}</p>
      <p>{printHours("Giovedì", hours[3])}</p>
      <p>{printHours("Venerdì", hours[4])}</p>
      <p>{printHours("Sabato", hours[5])}</p>
      <p>{printHours("Domenica", hours[6])}</p>
    </div>);
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Richieste
        </h2>
        {/* card container */}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                  getType(requests).color +
                  " " +
                  "group relative w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75"
                }
              >
                <h3 className="text-center mt-2">{getType(requests).type}</h3>
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
                title={getType(requests).type.toUpperCase()}
              >
                <p>{requests?.name}</p>
                <p>{requests?.description}</p>
                <p>{"lat: " +requests?.coordinate?.lat}</p>
                <p>{"lng: "+requests?.coordinate?.lon}</p>
                {renderhours(requests)}
                <p>{"Da :"+requests?.username}</p>
              </ModalComponent>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
