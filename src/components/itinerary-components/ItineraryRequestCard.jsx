import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../CardComponent";
import ModalComponent from "../ModalComponent";
import { publicInstance } from "../../api/axiosInstance";
import { useUserContext } from "../../utils/UserInfoProvider";
import LoadingComponent from "../LoadingComponent";


const colors = {
  pending: "border-yellow-200 hover:border-yellow-400 bg-yellow-200",
  rejected: "border-red-200 hover:border-red-400 bg-red-200",
  accepted: "border-green-200 hover:border-green-400 bg-green-200",
};
//component for render a card for a itinerary request
function ItineraryRequestCard({ request, reload }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    publicInstance
      .patch("/api/ente/itinerary/consensus", null, {
        params: {
          username: username,
          consensus: consensus,
          idRequest: requestId,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        setIsLoading(false);
        reload.action((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
                  setConsensusToRequest(request.id, true);
                  setOpen(false);
                },
              }
            : undefined
        }
        deny={
          request.status === "PENDING"
            ? {
                title: "rifiuta richiesta",
                action: () => {
                  setConsensusToRequest(request.id, false);
                  setOpen(false);
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
          <h3 className="text-sm">
            Città:
            <p className="mt-1 text-sm text-gray-500">
              {request.cities.map((c) => {
                return <li key={c.id}>{c.name}</li>;
              })}
            </p>
          </h3>
          <h3 className="text-sm">
            Punti:
            <p className="mt-1 text-sm text-gray-500">
              {request.points.map((p) => {
                return <li key={p.id}>{p.poi.name}</li>;
              })}
            </p>
          </h3>
        </div>
        <div>
          <h3 className="text-sm">
            Consensi
            {request.consensus.map((c) => {
              return (
                <p className="mt-1 text-sm text-gray-500" key={c}>
                  {c}
                </p>
              );
            })}
          </h3>
          {request.consensus.length + "/" + request.cities.length}
        </div>
      </CardComponent>
      {renderModal(request)}
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
