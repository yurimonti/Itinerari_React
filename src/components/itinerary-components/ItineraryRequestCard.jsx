import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../CardComponent";
import ModalComponent from "../ModalComponent";
import { publicInstance } from "../../api/axiosInstance";
import { useUserContext } from "../../utils/UserInfoProvider";
import LoadingComponent from "../LoadingComponent";
import MyAlert from "../MyAlert";

const colors = {
  pending:
    "border-4 border-yellow-300 hover:border-yellow-400 focus:border-yellow-400 shadow-yellow-200 shadow-md transition ease-in-out delay-10 duration-400 hover:shadow-lg hover:shadow-yellow-300",
  rejected:
    "border-4 border-red-500 hover:border-red-600 focus:border-red-600 shadow-red-400 shadow-md transition ease-in-out delay-10 duration-400 hover:shadow-lg hover:shadow-red-400",
  accepted:
    "border-4 border-green-500 hover:border-green-600 focus:border-green-600 shadow-green-400 shadow-md transition ease-in-out delay-10 duration-400 hover:shadow-lg hover:shadow-green-400",
};
//component for render a card for a itinerary request
function ItineraryRequestCard({ request, reload }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState({ result: "Indietro" });

  /**
   *
   * @param {string} status of a request
   * @returns a text status for a request
   */
  function getColorFromStatus(status) {
    let result = "";
    switch (status) {
      case "PENDING":
        result = colors.pending;
        break;
      case "ACCEPTED":
        result = colors.accepted;
        break;
      case "REJECTED":
        result = colors.rejected;
        break;
      default:
        break;
    }
    return result;
  }

  /**
   *
   * @param {number} requestId of a itinerary request to set consensus
   * @param {boolean} consensus to set
   */
  function setConsensusToRequest(requestId, consensus) {
    publicInstance
      .patch("/api/ente/itinerary/consensus", null, {
        params: {
          username: username,
          consensus: consensus,
          idRequest: requestId,
        },
      })
      .then((res) => {
        setIsLoading(true);
        console.log(res.data);
      })
      .then(() => {
        setIsLoading(false);
        reload.action((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        setMessages((pre) => {
          let result = {
            ...pre,
            title: "Impossibile completare operazione",
            content: "Si è verificato un errore durante l'operazione",
          };
          return result;
        });
        console.log(err);
        setIsLoading(false);
        setIsOpen(true);
      });
  }

  /**
   *
   * @returns a Modal component for a request
   */
  function renderModal() {
    return (
      <ModalComponent
        key={request.id}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        accept={
          request.status === "PENDING"
            ? {
                title: "accetta richiesta",
                action: () => {
                  setOpen(false);
                  setConsensusToRequest(request.id, true);
                },
              }
            : undefined
        }
        deny={
          request.status === "PENDING"
            ? {
                title: "rifiuta richiesta",
                action: () => {
                  setOpen(false);
                  setConsensusToRequest(request.id, false);
                },
              }
            : undefined
        }
        role="ente"
        title={request.name}
        modify={{
          title: "vedi richiesta",
          action: () => {
            navigate("/itinerary-request/" + request.id, {
              state: { isRequest: true },
            });
          },
        }}
      >
        <p>{request.description}</p>
      </ModalComponent>
    );
  }

  return (
    <div>
      <CardComponent
        color={getColorFromStatus(request.status)}
        name={request.name}
        disabled={request.status === "REJECTED"}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div>
          <h3 className="text-sm font-sans">
            Città:
            <p className="mt-1 text-gray-500">
              {request.cities.map((c) => {
                return <li key={c.id}>{c.name}</li>;
              })}
            </p>
          </h3>
          <h3 className="text-sm font-sans">
            Punti:
            <p className="mt-1 text-gray-500">
              {request.points.map((p) => {
                return (
                  <li key={p.id}>
                    {p.poi.name.length > 30
                      ? p.poi.name.slice(0, 30) + "..."
                      : p.poi.name}
                  </li>
                );
              })}
            </p>
          </h3>
        </div>
        <div>
          <h3 className="text-sm font-sans">
            Consensi
            {request.consensus.map((c) => {
              return (
                <p className="mt-1 text-gray-500" key={c}>
                  {c}
                </p>
              );
            })}
          </h3>
          <p className="mt-1 text-gray-500 font-sans text-sm">
            {request.consensus.length + "/" + request.cities.length}
          </p>
        </div>
      </CardComponent>
      {renderModal(request)}
      <MyAlert
        close={() => {
          setIsOpen(false);
        }}
        messages={messages}
        trigger={isOpen}
      />
      <LoadingComponent
        isLoading={isLoading}
        onClose={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

export default ItineraryRequestCard;
