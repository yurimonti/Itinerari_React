import { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import ProvaCheckBox from "./ProvaCheckBox";
import OraProva from "../OraProva";

export default function ProvaForm() {
  const [tagValues, setTagValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValues] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeValues, setTypeValues] = useState([]);
  //-------------------------------------dopo-------------------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0");
  const [clicked, setClicked] = useState(false);
  const [hours, setHours] = useState([]);
  const [address, setAddress] = useState({});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});

  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  const [ticket, setTicket] = useState("0.00");
  const [timeTovisit, setTimeToVisit] = useState("0");
  const [emailContacts, setEmailContacts] = useState("");
  const [phoneContacts, setPhoneContacts] = useState("");
  const [faxContacts, setFaxContacts] = useState("");
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
    let payload = {
      name: name,
      description: description,
      lat: lat,
      lon: lon,
      street: address.street,
      number: address.number,
      types: typesName,
      tags: tagValues,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
      phone: phoneContacts,
      email: emailContacts,
      fax: faxContacts,
      timeToVisit: timeTovisit,
      price: ticket,
    };
    publicInstance
      .post("/api/ente/createPoi", payload)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  //-----------------------------------useEffect-------------------------------------------------

  useEffect(() => {
    return () => {
      setTypeValues([]);
      setTagValues([]);
      setName("");
      setDescription("");
      setLat("0");
      setLon("0");
      setHours([]);
      setAddress((a) => {
        a.number = "";
        a.street = "";
        return a;
      });
      setEmailContacts("");
      setFaxContacts("");
      setHours([]);
      setPhoneContacts("");
      setTicket("0.00");
      setTimeToVisit("0");
    };
  }, [clicked]);
  //---------------------------------------------input render-------------------------------
  const anInput = (symbol, value, setValue, label, type, placeholder, min) => {
    return (
      <>
        <label
          htmlFor={label.toLowerCase()}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          {symbol !== null && (
            <div className="mr-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-black-500 md:text-l sm:text-sm">
                {symbol}
              </span>
            </div>
          )}
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type={type}
            min={min}
            name={label.toLowerCase()}
            id={label.toLowerCase()}
            className="focus:outline-none focus:ring-2 pl-3 pr-12 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
            placeholder={placeholder}
          />
        </div>
      </>
    );
  };

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
                {anInput(
                  null,
                  name,
                  setName,
                  "Nome POI",
                  "text",
                  "nome poi",
                  ""
                )}

                {/* Descrizione */}
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrizione
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-200"
                    placeholder="Descrizione ..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* city */}

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
                    name="poi-via"
                    id="poi-via"
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                    placeholder="Via del punto"
                    value={address.street}
                    onChange={(e) => {
                      setAddress((a) => {
                        a.street = e.target.value;
                        return a;
                      });
                    }}
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
                    name="poi-numero"
                    id="poi-numero"
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                    placeholder="numero della via"
                    value={address.number}
                    onChange={(e) => {
                      setAddress((a) => {
                        a.number = e.target.value;
                        return a;
                      });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* lat */}
                <div>
                  {anInput(null, lat, setLat, "Latitudine", "number", "0", "0")}
                </div>

                {/* lon */}
                <div>
                  {anInput(
                    null,
                    lon,
                    setLon,
                    "Longitudine",
                    "number",
                    "0",
                    "0"
                  )}
                </div>
              </div>

              {/* categories input select */}
              <ProvaCheckBox
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
                {anInput("€", ticket, setTicket, "Prezzo", "number", "0.00")}

                {/* time to visit input */}
                {anInput(
                  "min",
                  timeTovisit,
                  setTimeToVisit,
                  "Tempo Visita",
                  "number",
                  "0"
                )}
              </div>
              <br />
              <p>Contatti</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* email input */}
                {anInput(
                  null,
                  emailContacts,
                  setEmailContacts,
                  "Email",
                  "text",
                  "example@domain.com"
                )}
                {/* cellphone input */}
                {anInput(
                  "+39",
                  phoneContacts,
                  setPhoneContacts,
                  "Tel",
                  "number",
                  "0123456789"
                )}
                {/* fax input */}
                {anInput(
                  null,
                  faxContacts,
                  setFaxContacts,
                  "Fax",
                  "text",
                  "fax"
                )}
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
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  createPoi();
                  setClicked((c) => {
                    c = !c;
                    return c;
                  });
                }}
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
