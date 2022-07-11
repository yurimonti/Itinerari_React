import React, { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import { useMyContext } from "../../utils/MyProvider";
import CategorySection from "../category-type-tag-component/CategorySection";
import DayOpenComponent from "../DayOpenComponent";
import InputSelect from "../InputSelect";
import OraProva from "../prova/OraProva";
import OpenHourComponent from "./OpenHourComponent";

export default function PoiFormComponent() {
  const isUser = useMyContext();
  const [realCategories, setRealCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeValue, setTypeValue] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0");
  const [clicked, setClicked] = useState(false);
  const [hours, setHours] = useState([]);
  const [tagsAndValue, setTagsAndValue] = useState([]);
  const [address, setAddress] = useState({});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  //FIXME: valutare bene
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  //const [monday, setMonday] = useState({ start: [], end: [] });
  //const [tuesday, setTuesday] = useState({ start: [], end: [] });
  //const [wednesday, setWednesday] = useState({ start: [], end: [] });
  //const [thursday, setThursday] = useState({ start: [], end: [] });
  //const [friday, setFriday] = useState({ start: [], end: [] });
  //const [saturday, setSaturday] = useState({ start: [], end: [] });
  //const [sunday, setSunday] = useState({ start: [], end: [] });

  function getCities() {
    publicInstance
      .get("/api/city/all")
      .then((result) => setCities(result.data))
      .catch((err) => console.log(err.message));
  }

  function postCreatePoiRequest() {
    let typesName = typeValue.map((t) => {
      return t.name;
    });
    let payload = {
      name: name,
      description: description,
      city: city,
      lat: lat,
      lon: lon,
      street: address.street,
      number: address.number,
      types: typesName,
      tags: tagsAndValue,
    };
    publicInstance
      .post("/api/user/addPoi", payload)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  function createPoi() {
    let typesName = typeValue.map((t) => {
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
      tags: tagsAndValue,
    };
    publicInstance
      .post("/api/ente/createPoi", payload)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isUser === true) getCities();
    return () => {
      setName("");
      setDescription("");
      setLat("0");
      setLon("0");
      setTypeValue([]);
      setHours([]);
      setTagsAndValue([]);
      setAddress((a) => {
        a.number = "";
        a.street = "";
        return a;
      });
    };
  }, [clicked]);

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            POI Base Informations
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-0 md:col-span-2">
        <form>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <br />
              <p>Poi informations</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* <div className="col-span-3 sm:col-span-2"> */}
                <label
                  htmlFor="poi-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  POI name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="poi-name"
                    id="poi-name"
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                    placeholder="Nome del punto"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                {/* </div> */}
                {/* Descrizione */}
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
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
              {isUser === true && (
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
                  <InputSelect
                    values={cities}
                    value={city}
                    onChange={setCity}
                    keyValue="City"
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
                  POI via
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
                  numero
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
                  <label
                    htmlFor="poi-lat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    POI latitude
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="poi-lat"
                      id="poi-lat"
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                      placeholder="Latitudine del punto"
                      value={lat}
                      onChange={(e) => {
                        setLat(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {/* lon */}
                <div>
                  <label
                    htmlFor="poi-lon"
                    className="block text-sm font-medium text-gray-700"
                  >
                    POI longitude
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="poi-lon"
                      id="poi-lon"
                      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                      placeholder="Longitudine del punto"
                      value={lon}
                      onChange={(e) => {
                        setLon(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* categories input select */}

              <CategorySection
                categories={realCategories}
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
                setCategories={setRealCategories}
                types={types}
                setTypeValue={setTypeValue}
                typeValue={typeValue}
                setTypes={setTypes}
                tagsAndValue={tagsAndValue}
              />
              {/* timepicker */}
              <br />
              <p>Open</p>
              <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
              <OraProva keyValue="Monday" value={monday} setValue={setMonday}/>
              <OraProva keyValue="Tuesday" value={tuesday} setValue={setTuesday}/>
              <OraProva keyValue="Wednesday" value={wednesday} setValue={setWednesday}/>
              <OraProva keyValue="Thursday" value={thursday} setValue={setThursday}/>
              <OraProva keyValue="Friday" value={friday} setValue={setFriday}/>
              <OraProva keyValue="Saturday" value={saturday} setValue={setSaturday}/>
              <OraProva keyValue="Sunday" value={sunday} setValue={setSunday}/>
              </div>
              {/* <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-1">
                <DayOpenComponent keyValue={"Open time"} />
                <DayOpenComponent keyValue={"Closed time"} />
              </div> */}

              {/* <div className="float-left mr-6">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Time Open
                </label>
                <input
                  type="time"
                  name="time"
                  className="hover:bg-indigo-200"
                  value={hours[0]}
                  onChange={(e) => {
                    setHours((prev) => {
                      prev[0] = e.target.value;
                      return prev;
                    });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Time Close
                </label>
                <input
                  type="time"
                  name="time"
                  className="hover:bg-indigo-200"
                  value={hours[1]}
                  onChange={(e) => {
                    setHours((prev) => {
                      prev[1] = e.target.value;
                      return prev;
                    });
                  }}
                />
              </div> */}
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  isUser === true ? postCreatePoiRequest() : createPoi();
                  setClicked((c) => {
                    c = !c;
                    return c;
                  });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
