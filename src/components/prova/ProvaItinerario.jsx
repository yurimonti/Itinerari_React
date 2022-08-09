import { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import ClassicInput from "../ClassicInput";
import { getDirections } from "../../utils/map-utils/directionService";

const initialInputs = { id1: "",id2:"",id3:"", name: "", description: "" };

const ProvaItinerario = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [geojson,setGeojson] = useState();
  const [points,setPoints] = useState([]);

  useEffect(() => {
    return () => {
      setInputs(initialInputs);
      setPoints([]);
    };
  }, []);

  function createItineraryFromId() {
    let payload = {
      geojson: JSON.stringify(geojson),
      poiIds: [inputs.id1.toString(), inputs.id2.toString(), inputs.id3.toString()],
      name:inputs.name,
      description:inputs.description,
      travelTime: geojson.features[0].properties.summary.duration.toString(),
    };
    publicInstance
      .post("/api/ente/itinerary", payload, {
        params: { username: "ente_camerino" },
      })
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err));
  }

  function updateState(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  }

  return (
    <>
      <ClassicInput
        placeholder="id del primo poi"
        type="number"
        name="id1"
        value={inputs.id1}
        setValue={updateState}
      />
      <ClassicInput
      placeholder="id del secondo poi"
        type="number"
        name="id2"
        value={inputs.id2}
        setValue={updateState}
      />
      <ClassicInput
      placeholder="id del terzo poi"
        type="number"
        name="id3"
        value={inputs.id3}
        setValue={updateState}
      />
      <ClassicInput
      placeholder="nome poi"
        type="text"
        name="name"
        value={inputs.name}
        setValue={updateState}
      />
      <textarea
        name="description"
        value={inputs.description}
        placeholder="descrizione poi"
        onChange={updateState}
      />
      <button
        type="button"
        onClick={createItineraryFromId}
        className="bg-sky-500 border border-violet"
      >
        {" "}
        CLICK ME!!
      </button>
    </>
  );
};

export default ProvaItinerario;
