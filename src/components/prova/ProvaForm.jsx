import { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import InputSelect from "../InputSelect";
import ProvaCategories from "./ProvaCategories";
import OraProva from "../OraProva";
import { useMyContext } from "../../utils/MyProvider";
import { useLocation } from "react-router-dom";
import ClassicInput from "./ClassicInput";

const initialStateInputsString = {
  name: "",
  description: "",
  lat: "0",
  lon: "0",
  street: "",
  number: "0",
  ticket: "0.00",
  timeToVisit: "0.00",
  emailContacts: "",
  phoneContacts: "",
  faxContacts: "",
};

export default function ProvaForm({ role }) {
  const [tagValues, setTagValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValues] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeValues, setTypeValues] = useState([]);
  //-------------------------------------dopo-------------------
  const location = useLocation();
  const [inputsString, setInputsString] = useState(initialStateInputsString);
  /* const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0"); */
  const [clicked, setClicked] = useState(false);
  /*   const [address, setAddress] = useState({}); */
  /*   const [street, setStreet] = useState("");
  const [number, setNumber] = useState("0"); */
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});

  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  /*  const [ticket, setTicket] = useState("0.00");
  const [timeTovisit, setTimeToVisit] = useState("0");
  const [emailContacts, setEmailContacts] = useState("");
  const [phoneContacts, setPhoneContacts] = useState("");
  const [faxContacts, setFaxContacts] = useState(""); */
  //-------------------------------------------handle inputs string----------------------------------------------
  function handleInputsString(e) {
    setInputsString((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputsString);
  }

  //--------------------------------------------APIs call------------------------------------------
  function getCities() {
    publicInstance
      .get("/api/city/all")
      .then((result) => setCities(result.data))
      .catch((err) => console.log(err.message));
  }

  function createPoi() {
    let typesName = typeValues.map((t) => {
      return t.name;
    });
    let params =
      location?.state?.poi === undefined
        ? { username: "ente_camerino" }
        : { username: "ente_camerino", id: location.state.poi.id };
    let url =
      location?.state?.poi === undefined
        ? "/api/ente/createPoi"
        : "/api/ente/notifies/modify";
    let payload = {
      name: inputsString.name,
      description: inputsString.description,
      lat: inputsString.lat.toString(),
      lon: inputsString.lon.toString(),
      street: inputsString.street,
      number: inputsString.number.toString(),
      types: typesName,
      tags: tagValues,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
      phone: inputsString.phoneContacts.toString(),
      email: inputsString.emailContacts,
      fax: inputsString.faxContacts,
      timeToVisit: inputsString.timeTovisit.toString(),
      price: inputsString.ticket.toString(),
      username: null,
    };
    if (location?.state?.poi !== undefined)
      payload.username = location.state.poi.username;
    publicInstance
      .post(url, payload, {
        params: params,
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  function postCreatePoiRequest(isToAdd) {
    let typesName = typeValues.map((t) => {
      return t.name;
    });
    let payload = {
      name: inputsString.name,
      description: inputsString.description,
      city: city,
      lat: inputsString.lat.toString(),
      lon: inputsString.lon.toString(),
      street: inputsString.street,
      number: inputsString.number.toString(),
      types: typesName,
      tags: tagValues,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
      phone: inputsString.phoneContacts.toString(),
      email: inputsString.emailContacts,
      fax: inputsString.faxContacts,
      timeToVisit: inputsString.timeTovisit.toString(),
      price: inputsString.ticket.toString(),
      poi: null,
      username: "an_user",
    };
    if (isToAdd === true) {
      publicInstance
        .post("/api/user/addPoi", payload)
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => console.log(err));
    } else {
      payload.poi = location.state.poi.id.toString();
      publicInstance
        .post("/api/user/modifyPoi", payload)
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => console.log(err));
    }
  }

  //-----------------------------------useEffect-------------------------------------------------

  function renderFormIfIsPreFilled() {
    if (location?.state?.poi !== undefined) {
      let poiState = {
        name: location.state.poi.name,
        description: location.state.poi.description,
        lat: location.state.poi.coordinate.lat,
        lon: location.state.poi.coordinate.lon,
        street: location.state.poi.address.street,
        number: location.state.poi.address.number,
        ticket: location.state.poi.ticket,
        timeToVisit: location.state.poi.timeToVisit,
        emailContacts: location.state.poi.contact.email,
        phoneContacts: location.state.poi.contact.cellNumber,
        faxContacts: location.state.poi.contact.fax,
      };
      setInputsString(poiState);
      /* setEmailContacts(location.state.poi.contact.email);
      setFaxContacts(location.state.poi.contact.fax);
      setPhoneContacts(location.state.poi.contact.cellNumber);
      setName(location.state.poi.name);
      setDescription(location.state.poi.description);
      setLat(location.state.poi.coordinate.lat);
      setLon(location.state.poi.coordinate.lon); */
      location.state.poi.hours.monday.length !== 0 &&
        setMonday(location.state.poi.hours.monday);
      location.state.poi.hours.tuesday.length !== 0 &&
        setTuesday(location.state.poi.hours.tuesday);
      location.state.poi.hours.wednesday.length !== 0 &&
        setWednesday(location.state.poi.hours.wednesday);
      location.state.poi.hours.thursday.length !== 0 &&
        setThursday(location.state.poi.hours.thursday);
      location.state.poi.hours.friday.length !== 0 &&
        setFriday(location.state.poi.hours.friday);
      location.state.poi.hours.saturday.length !== 0 &&
        setSaturday(location.state.poi.hours.saturday);
      location.state.poi.hours.sunday.length !== 0 &&
        setSunday(location.state.poi.hours.sunday);
      setTypeValues(location.state.poi.types);
      /* setStreet(location.state.poi.address.street);
      setNumber(location.state.poi.address.number); */
      location.state.poi.tagValues.forEach((tv) => {
        setTagValues((previous) => {
          if (tv.tag.isBooleanType)
            previous.push({ tag: tv.tag.name, value: tv.booleanValue });
          else previous.push({ tag: tv.tag.name, value: tv.stringValue });
          return previous;
        });
      });
    }
  }

  useEffect(() => {
    renderFormIfIsPreFilled();
    if (role === "user" && location?.state?.poi === undefined) {
      getCities();
    }
    return () => {
      setCategoryValues([]);
      setTypeValues([]);
      setTagValues([]);
      /* setName("");
      setDescription("");
      setLat("0");
      setLon("0"); */
      /* setStreet("");
      setNumber("0"); */
      /* setEmailContacts("");
      setFaxContacts("");
      setPhoneContacts("");
      setTicket("0.00");
      setTimeToVisit("0"); */
      if (role === "user") {
        setCity({});
        setCities([]);
      }
    };
  }, [clicked]);
  //---------------------------------------------input render-------------------------------

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Informazioni POI Base
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Queste informazioni verranno visualizzate pubblicamente, quindi fai
            attenzione a ciò che condividi.
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-0 md:col-span-2">
        <form>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <br />
              <p>Informazioni Poi</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome POI */}
                <ClassicInput
                  name="name"
                  symbol={null}
                  value={inputsString.name}
                  setValue={handleInputsString}
                  label="name"
                  type="text"
                  placeholder="Nome del Poi"
                  min=""
                />

                {/* Descrizione */}
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrizione
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-200"
                    placeholder="Descrizione ..."
                    value={inputsString.description}
                    onChange={handleInputsString}
                  />
                </div>
              </div>

              {/* city */}
              {role === "user" && location?.state?.poi === undefined && (
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
                  <InputSelect
                    values={cities}
                    value={city}
                    onChange={setCity}
                    keyValue="Città"
                    toView="name"
                  />
                </div>
              )}

              <div className="md:grid md:grid-cols-2 md:gap-6">
                {/* indirizzo */}
                <label
                  htmlFor="poi-via"
                  className="block text-sm font-medium text-gray-700"
                >
                  Via POI
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="street"
                    id="street"
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                    placeholder="Via del punto"
                    value={inputsString.street}
                    onChange={handleInputsString}
                  />
                </div>
                <label
                  htmlFor="poi-numero"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numero Civico
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="number"
                    id="number"
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                    placeholder="numero della via"
                    value={inputsString.number}
                    onChange={handleInputsString}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* lat */}
                <div>
                  <ClassicInput
                    name="lat"
                    symbol={null}
                    value={inputsString.lat}
                    setValue={handleInputsString}
                    label="lat"
                    type="number"
                    placeholder="latitudine del Poi"
                    min="0"
                  />
                </div>
                {/* lon */}
                <div>
                  <ClassicInput
                    name="lon"
                    symbol={null}
                    value={inputsString.lon}
                    setValue={handleInputsString}
                    label="lon"
                    type="number"
                    placeholder="longitudine del Poi"
                    min="0"
                  />
                </div>
              </div>

              {/* categories input select */}
              <ProvaCategories
                categories={categories}
                setCategories={setCategories}
                categoryValues={categoryValues}
                setCategoryValues={setCategoryValues}
                types={types}
                setTypeValues={setTypeValues}
                typeValues={typeValues}
                setTypes={setTypes}
                tagValues={tagValues}
                setTagValues={setTagValues}
              />
              <br />
              <p>Visita</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ticket input */}
                <ClassicInput
                  name="ticket"
                  symbol="€"
                  value={inputsString.ticket}
                  setValue={handleInputsString}
                  label="ticket"
                  type="number"
                  placeholder="Prezzo"
                  min="0.00"
                />

                {/* time to visit input */}
                <ClassicInput
                  name="timeToVisit"
                  symbol={null}
                  value={inputsString.timeToVisit}
                  setValue={handleInputsString}
                  label="timeToVisit"
                  type="number"
                  placeholder="Tempo Visita"
                  min="0"
                />
              </div>
              <br />
              <p>Contatti</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* email input */}
                <ClassicInput
                  name="emailContacts"
                  symbol={null}
                  value={inputsString.emailContacts}
                  setValue={handleInputsString}
                  label="emailContacts"
                  type="text"
                  placeholder="example@domain.com"
                  min=""
                />
                {/* cellphone input */}
                <ClassicInput
                  name="phoneContacts"
                  symbol="+39"
                  value={inputsString.phoneContacts}
                  setValue={handleInputsString}
                  label="phoneContacts"
                  type="number"
                  placeholder="0123456789"
                  min=""
                />
                {/* fax input */}
                <ClassicInput
                  name="faxContacts"
                  symbol="+39"
                  value={inputsString.faxContacts}
                  setValue={handleInputsString}
                  label="faxContacts"
                  type="text"
                  placeholder="fax"
                  min=""
                />
              </div>

              {/* timepicker */}
              <br />
              <p>Orari</p>
              <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
                <OraProva
                  keyValue="Lunedì"
                  value={monday}
                  setValue={setMonday}
                />
                <OraProva
                  keyValue="Martedì"
                  value={tuesday}
                  setValue={setTuesday}
                />
                <OraProva
                  keyValue="Mercoledì"
                  value={wednesday}
                  setValue={setWednesday}
                />
                <OraProva
                  keyValue="Giovedì"
                  value={thursday}
                  setValue={setThursday}
                />
                <OraProva
                  keyValue="Venerdì"
                  value={friday}
                  setValue={setFriday}
                />
                <OraProva
                  keyValue="Sabato"
                  value={saturday}
                  setValue={setSaturday}
                />
                <OraProva
                  keyValue="Domenica"
                  value={sunday}
                  setValue={setSunday}
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex mr-3 justify-center py-2 px-4 border border-gray shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-200"
                onClick={() => {
                  setClicked((c) => {
                    c = !c;
                    return c;
                  });
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  if (role === "user") {
                    if (location?.state?.poi === undefined)
                      postCreatePoiRequest(true);
                    else postCreatePoiRequest(false);
                  } else createPoi();
                  setClicked((c) => {
                    c = !c;
                    return c;
                  });
                }}
              >
                Salva
              </button>
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  console.log(inputsString);
                }}
              >
                Stampa Valori
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
