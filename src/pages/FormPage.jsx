import { useState, useEffect } from "react";
import { publicInstance } from "../api/axiosInstance";
import InputSelect from "../components/InputSelect";
import CategoriesComponent from "../components/form-components/CategoriesComponent";
import DayHoursComponent from "../components/form-components/DayHoursComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ClassicInput from "../components/ClassicInput";
import { useUserContext } from "../utils/UserInfoProvider";
import LoadingComponent from "../components/LoadingComponent";
import MyAlert from "../components/MyAlert";

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

export default function FormPage({ role }) {
  const { username } = useUserContext();
  const { id } = useParams();
  const [tagValues, setTagValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValues] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeValues, setTypeValues] = useState([]);
  //-------------------------------------dopo-------------------
  const location = useLocation();
  const [inputsString, setInputsString] = useState(initialStateInputsString);
  const [clicked, setClicked] = useState(false);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});

  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //-------------------------------------------handle inputs----------------------------------------------
  function handleInputsString(e) {
    setInputsString((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  //-------------------------------------------handle poi or request----------------------------------------------

  function resetHours() {
    setMonday(["", "", "", ""]);
    setTuesday(["", "", "", ""]);
    setWednesday(["", "", "", ""]);
    setThursday(["", "", "", ""]);
    setFriday(["", "", "", ""]);
    setSaturday(["", "", "", ""]);
    setSunday(["", "", "", ""]);
  }

  function wrapDay(day) {
    let result = [];
    for (const hour of day) {
      if (hour !== "") result.push(hour);
    }
    return result;
  }

  function reset() {
    setTagValues([]);
    setCategories([]);
    setCategoryValues([]);
    setTypes([]);
    setTypeValues([]);
    setCity({});
    setCities([]);
    setInputsString(initialStateInputsString);
    resetHours();
  }

  function getDataFromId() {
    let url = "";
    if (id !== undefined) {
      if (location.state?.poi) url = "/api/poi";
      else url = "/api/request";
    }
    publicInstance
      .get(url, {
        params: { id: id },
      })
      .then((res) => {
        setIsLoading(true);
        setData(res.data);
        renderFormIfIsPreFilled(res.data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function newPoi(isToModify) {
    let typesName = typeValues.map((t) => {
      return t.name;
    });
    let url = !isToModify ? "/api/ente/createPoi" : "/api/ente/poi";
    let payload = {
      name: inputsString.name,
      description: inputsString.description,
      lat: inputsString.lat.toString(),
      lon: inputsString.lon.toString(),
      street: inputsString.street,
      number: inputsString.number.toString(),
      types: typesName,
      tags: tagValues,
      monday: wrapDay(monday),
      tuesday: wrapDay(tuesday),
      wednesday: wrapDay(wednesday),
      thursday: wrapDay(thursday),
      friday: wrapDay(friday),
      saturday: wrapDay(saturday),
      sunday: wrapDay(sunday),
      phone: inputsString.phoneContacts.toString(),
      email: inputsString.emailContacts,
      fax: inputsString.faxContacts,
      timeToVisit: inputsString.timeToVisit.toString(),
      price: inputsString.ticket.toString(),
    };
    let params = !isToModify
      ? { username: username }
      : { username: username, id: id };
    let result = !isToModify
      ? publicInstance.post(url, payload, {
          params: params,
        })
      : publicInstance.patch(url, payload, {
          params: params,
        });
    setIsLoading(true);
    result
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        setIsLoading(false);
        role === "user" ? navigate("/notifies") : navigate("/map");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsOpen(true);
      });
  }

  function modifyRequest() {
    let typesName = typeValues.map((t) => {
      return t.name;
    });
    let payload = {
      name: inputsString.name,
      description: inputsString.description,
      lat: inputsString.lat.toString(),
      lon: inputsString.lon.toString(),
      street: inputsString.street,
      number: inputsString.number.toString(),
      types: typesName,
      tags: tagValues,
      monday: wrapDay(monday),
      tuesday: wrapDay(tuesday),
      wednesday: wrapDay(wednesday),
      thursday: wrapDay(thursday),
      friday: wrapDay(friday),
      saturday: wrapDay(saturday),
      sunday: wrapDay(sunday),
      phone: inputsString.phoneContacts.toString(),
      email: inputsString.emailContacts,
      fax: inputsString.faxContacts,
      timeToVisit: inputsString.timeToVisit.toString(),
      price: inputsString.ticket.toString(),
      username: data.username,
    };
    publicInstance
      .post("/api/ente/notifies/modify", payload, {
        params: { username: username, id: id },
      })
      .then((res) => {
        setIsLoading(true);
        console.log(res.status);
        navigate("/notifies");
      })
      .then(() => {
        setIsLoading(false);
        navigate("/notifies");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleSaveButtonClick() {
    if (role === "user") {
      if (id === undefined) postCreatePoiRequest(true);
      else postCreatePoiRequest(false);
    } else {
      if (id === undefined) {
        newPoi(false);
      } else {
        if (location?.state?.poi) {
          newPoi(true);
        } else {
          modifyRequest();
        }
      }
    }
  }

  //--------------------------------------------APIs call------------------------------------------

  function getCities() {
    publicInstance
      .get("/api/city/all")
      .then((result) => setCities(result.data))
      .catch((err) => console.log(err.message));
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
      monday: wrapDay(monday),
      tuesday: wrapDay(tuesday),
      wednesday: wrapDay(wednesday),
      thursday: wrapDay(thursday),
      friday: wrapDay(friday),
      saturday: wrapDay(saturday),
      sunday: wrapDay(sunday),
      phone: inputsString.phoneContacts.toString(),
      email: inputsString.emailContacts,
      fax: inputsString.faxContacts,
      timeToVisit: inputsString.timeToVisit.toString(),
      price: inputsString.ticket.toString(),
      poi: null,
      username: username,
    };
    if (isToAdd === true) {
      setIsLoading(true);
      publicInstance
        .post("/api/user/addPoi", payload)
        .then((res) => {
          console.log(res.status);
        })
        .then(() => {
          setIsLoading(false);
        })
        .then(() => {
          navigate("/notifies");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      payload.poi = id.toString();
      publicInstance
        .post("/api/user/modifyPoi", payload)
        .then((res) => {
          console.log(res.status);
        })
        .then(() => {
          setIsLoading(false);
        })
        .then(() => {
          navigate("/notifies");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsOpen(true);
        });
    }
  }

  //-----------------------------------useEffect-------------------------------------------------

  function renderFormIfIsPreFilled(info) {
    //setIsLoading(true);
    if (id !== undefined) {
      let sourceInfo = location.state.poi === true ? info.poi : info;
      let poiState = {
        name: sourceInfo.name,
        description: sourceInfo.description,
        lat: sourceInfo.coordinate.lat,
        lon: sourceInfo.coordinate.lon,
        street: sourceInfo.address.street,
        number: sourceInfo.address.number,
        ticket: sourceInfo.ticketPrice,
        timeToVisit: sourceInfo.timeToVisit,
        emailContacts: sourceInfo.contact.email,
        phoneContacts: sourceInfo.contact.cellNumber,
        faxContacts: sourceInfo.contact.fax,
      };
      setInputsString(poiState);
      sourceInfo.hours.monday.length !== 0 &&
        setMonday(sourceInfo.hours.monday);
      sourceInfo.hours.tuesday.length !== 0 &&
        setTuesday(sourceInfo.hours.tuesday);
      sourceInfo.hours.wednesday.length !== 0 &&
        setWednesday(sourceInfo.hours.wednesday);
      sourceInfo.hours.thursday.length !== 0 &&
        setThursday(sourceInfo.hours.thursday);
      sourceInfo.hours.friday.length !== 0 &&
        setFriday(sourceInfo.hours.friday);
      sourceInfo.hours.saturday.length !== 0 &&
        setSaturday(sourceInfo.hours.saturday);
      sourceInfo.hours.sunday.length !== 0 &&
        setSunday(sourceInfo.hours.sunday);
      setTypeValues(sourceInfo.types);
      sourceInfo.tagValues.forEach((tv) => {
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
    if (id !== undefined) {
      getDataFromId();
    }
    if (role === "user" && id === undefined) {
      getCities();
    }
    return () => {
      setCategoryValues([]);
      setTypeValues([]);
      setTagValues([]);
      if (role === "user") {
        setCity({});
        setCities([]);
      }
    };
  }, [clicked, role]);
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
              <CategoriesComponent
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
                  //symbol="+39"
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
              <button
                type="button"
                onClick={resetHours}
                className="bg-sky-300 flex m-auto justify-center"
              >
                {" "}
                clear hours{" "}
              </button>
              <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
                <DayHoursComponent
                  keyValue="Lunedì"
                  value={monday}
                  setValue={setMonday}
                />
                <DayHoursComponent
                  keyValue="Martedì"
                  value={tuesday}
                  setValue={setTuesday}
                />
                <DayHoursComponent
                  keyValue="Mercoledì"
                  value={wednesday}
                  setValue={setWednesday}
                />
                <DayHoursComponent
                  keyValue="Giovedì"
                  value={thursday}
                  setValue={setThursday}
                />
                <DayHoursComponent
                  keyValue="Venerdì"
                  value={friday}
                  setValue={setFriday}
                />
                <DayHoursComponent
                  keyValue="Sabato"
                  value={saturday}
                  setValue={setSaturday}
                />
                <DayHoursComponent
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
                  location?.state?.poi === undefined
                    ? setClicked((c) => {
                        c = !c;
                        return c;
                      })
                    : reset();
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setIsLoading(true);
                  handleSaveButtonClick();
                  /* setClicked((c) => {
                    c = !c;
                    return c;
                  }); */
                }}
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      </div>
      <LoadingComponent
        onClose={() => {
          setIsLoading(false);
        }}
        isLoading={isLoading}
      />
      <MyAlert
        trigger={isOpen}
        close={() => {
          setIsOpen(false);
        }}
        messages={{
          title: "ERRORE",
          content: "Si è verificato un errore",
          result: "indietro",
        }}
      />
    </div>
  );
}
