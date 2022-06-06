import React, { useState, useEffect } from "react";
import { publicInstance } from "../api/axiosInstance";
import CategorySection from "./category-type-tag-component/CategorySection";

function ExampleComponent() {
  const [realCategories, setRealCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeValue, setTypeValue] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [clicked, setClicked] = useState(false);
  const [via, setVia] = useState("");
  const [number, setNumber] = useState(0);

  function createPoi() {
    let payload = {
      name: name,
      description: description,
      lat: lat,
      lon: lon,
    };
    publicInstance
      .post("/api/ente/createPoi", payload)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    return () => {
      setName("");
      setDescription("");
      setLat("");
      setLon("");
      setClicked(false);
      setTypeValue([]);
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
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
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
                </div>
              </div>

              <div>
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
                {/* <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p> */}
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
              />

              {/* address Section */}
              <br />
              <p>Address</p>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
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
                      value={via}
                      onChange={(e) => {
                        setVia(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2">
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
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* lat e lon */}
              <br />
              <p>Coordinate</p>
              <div className="grid grid-cols-3 gap-6">
                {/* lat */}
                <div /* className="col-span-3 sm:col-span-2" */>
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
                <div /* className="col-span-3 sm:col-span-2" */>
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

              {/* timepicker */}
              <br />
              <p>Open time</p>
              <div className="float-left mr-6">
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
                />
              </div>

              {/* <button
                  type="button"
                  onClick={() => {
                    alert(
                      categoryValue.map((c) => {
                        return c.name;
                      })
                    );
                  }}
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Print
                </button>
              </div>
              <div>
                {categoryValue.length > 0 ? (
                  renderInputTag()
                ) : (
                  <p>no category selected</p>
                )}
              </div> */}

              {/* categories input select */}

              {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  createPoi();
                  setClicked(true);
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

export default ExampleComponent;
