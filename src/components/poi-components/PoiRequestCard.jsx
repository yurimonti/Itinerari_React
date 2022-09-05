import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../ModalComponent";
import { publicInstance } from "../../api/axiosInstance";
import MyAlert from '../MyAlert';
import LoadingComponent from '../LoadingComponent';

// Component for a Request Card
function PoiRequestCard({ request,reload,role }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isOpen,setIsOpen] = useState(false);
  const [messages,setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  

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

  function getType() {
    return request.poiId === null ? styles[0] : styles[1];
  }

  function getStatus() {
    if (request.status === "REJECTED") return styles[2];
    if (request.status === "ACCEPTED") return styles[0];
    if (request.status === "PENDING") return styles[1];
  }

  function getRequestInfo() {
    return role === "ente" ? getType(request) : getStatus(request);
  }

  /**
   *
   * @param {boolean} toSet isAccepted
   * @param {number} id id of Request
   * @param {string} toRead string to set in the message
   */
  function setRequestTo(toSet,id ,toRead) {
    setIsLoading(true);
    if (role === "ente") {
      publicInstance
        .post("/api/ente/notifies", null, {
          //TODO:cambiare toSet isAccepted id in idPoiRequests
          params: { toSet: toSet, id: id },
        })
        .then(()=>setIsLoading(false))
        .then(() => {
          setMessages({title:"SUCCESSO",content:"Richiesta "+toRead});
          setIsOpen(true);
        })
        .catch((err) => {
          setIsLoading(false);
          setMessages({title:"ERRORE",content:"Errore nella richiesta "+err.response.status});
          setIsOpen(true);
        });
    } //TODO: mettere metodo per user
  }

  function printHours(day, hours) {
    if (hours.length !== 2 && hours.length !== 4) return day + " - chiuso";
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

  function renderhours() {
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

  function printTypes() {
    let result = "";
    request.types.forEach((t) => {
      result += t.name + " ";
    });
    return result;
  }

  function renderTags() {
    return request.tagValues.map((tv) => {
      return (
        <p key={tv.tag.name}>
          {tv.tag.name}:{" "}
          {tv.tag.isBooleanType
            ? tv.booleanValue.toString()
            : tv.stringValue.toString()}
        </p>
      );
    });
  }

  return (
    <>
      <button
        key={request.id}
        disabled={request.status === "REJECTED"}
        onClick={() => {
          request.status === "PENDING" ? setOpen(true) : navigate("/pois/"+request.id, {
            state: { poi: false },
          });
        }}
      >
        <div
          className={
            getRequestInfo(request).color +
            " " +
            "group relative w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75"
          }
        >
          <h3 className="text-center mt-2">
            {getRequestInfo(request).type.toUpperCase()}
          </h3>
          <div className="h-5 border-b-2 border-black" />
          <div className="mt-4 justify-center">
            {/* nome aggiunta */}
            <div className="m-2">
              <h2 className="text-md text-black-700 text-center">
                {request.name}
              </h2>
            </div>
            <div className="m-2">
              <h2 className="text-sm text-gray-700 text-center">
                {request.description.slice(0, 32) + "..."}
              </h2>
            </div>
            <div className="m-2">
              <h2 className="text-md text-black-700 text-center">
                {"lat: " +
                  request.coordinate.lat +
                  " lng: " +
                  request.coordinate.lon}
              </h2>
            </div>
          </div>
          <div className="text-right justify-end">
            <h3 className="text-sm text-gray-700">da {request.username}</h3>
          </div>
        </div>
      </button>
      <ModalComponent
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        deny={role==="ente" ? {title:"rifiuta richiesta",action:() => {
          setRequestTo(false, request.id, "cancellata".toUpperCase());
          setOpen(false);
        }} : undefined}
        accept={role==="ente" ? {title:"accetta richiesta",action:() => {
          setRequestTo(true, request.id, "accettata".toUpperCase());
          setOpen(false);
        } }: undefined}
        modify={role==="ente" ? {title:"modifica richiesta",action:() => {
          setOpen(false);
          navigate("/poi-form/request/" + request.id, {
            state: { poi: false },
          });
        }}: undefined}
        title={getRequestInfo(request).type.toUpperCase()}
      >
        <p>{request?.name}</p>
        <p>{request?.description}</p>
        <p>{printTypes()}</p>
        <p>{"lat: " + request?.coordinate?.lat}</p>
        <p>{"lng: " + request?.coordinate?.lon}</p>
        {renderhours()}
        {renderTags()}
        <p>{"Da :" + request?.username}</p>
      </ModalComponent>
      <MyAlert
        trigger={isOpen}
        close={() => {
            setIsOpen(false);
            reload((p) => {
              p = !p;
              return p;
            });
          }
        }
        messages={{...messages ,result: "OK" }}
      />
      <LoadingComponent onClose={()=>{setIsLoading(false);}} isLoading={isLoading} />
    </>
  );
}

export default PoiRequestCard;
