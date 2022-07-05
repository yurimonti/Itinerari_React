import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ModalComponent from "./ente-components/ModalComponent";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

export default function NotifiesComponent() {
  const [requests, setRequests] = useState([]);
  const [open,setOpen] = useState(false);

  function getAllNotifies() {
    publicInstance
      .get("/api/ente/notifies", {
        params: { username: "ente1" },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllNotifies();
    return () => {
      setRequests([]);
    };
  }, []);

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
            <button key={requests.id} onClick={()=>{
              setOpen(true);
            }}>
            <div
              key={requests.id}
              /* className="group relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none" */
              className="group relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75"
              >
              <h3 className="text-center mt-2">
                {requests.poiId === null
                  ? "aggiunta"
                  : "modifica"}
              </h3>
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
                {/* <p className="text-sm font-medium text-gray-900">
                  {requests.coordinate.lat + " " + requests.coordinate.lon}
                </p> */}
                <div className="m-2">
                  {/* <h2 className="text-md text-black-700 text-center">
                    {requests.coordinate.lat + " " + requests.coordinate.lon}
                  </h2> */}
                  {/* <p className="mt-1 text-sm text-gray-500">{requests.color}</p> */}
                </div>
              </div>
              <div className="text-right justify-end">
               <h3 className="text-sm text-gray-700">da {requests.username}</h3>
              </div>
            </div>
            </button>
          ))}
        </div>
      </div>
      <ModalComponent open={open} onClose={()=>{setOpen(false)}} title="ciao"/>
    </div>
  );
}
