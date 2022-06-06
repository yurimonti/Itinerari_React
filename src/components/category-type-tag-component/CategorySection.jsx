import { useState,useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import ExampleListBox from "../ExampleListBox";

export default function CategorySection(props) {
  const [click, setClick] = useState(false);

  useEffect(() => {
    getCategories();  
    return () => {
      props.setCategoryValue([]);
      props.setCategories([]);
    }
  },[])
  

  function getCategories() {
    publicInstance
      .get("/api/category/all")
      .then((res) => {
        props.setCategories(res.data);
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTypesFiltered() {
    let payload = props.categoryValue;
    publicInstance
      .post("/api/poiType/all",payload)
      .then((res) => {
        props.setTypes(res.data);
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {/* categories input select */}
      <p>Categories</p>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 sm:col-span-2 flex">
          <ExampleListBox
            values={props.categories}
            value={props.categoryValue}
            multiple={true}
            onChange={props.setCategoryValue}
            keyValue=""
          />
        </div>
        <div className="col-span-3 sm:col-span-2">
          <button
            type="button"
            onClick={() => {
              if(!click)getTypesFiltered();
              else props.setCategoryValue([]);
              setClick((s) => !s);
            }}
            className="ml-5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {click ? "delete" : "confirm"}
          </button>
        </div>
      </div>
      {/* type input select */}
      {click ? (
        <div>
          <p>Types</p>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2 flex">
              <ExampleListBox
                values={props.types}
                value={props.typeValue}
                multiple={true}
                onChange={props.setTypeValue}
                keyValue=""
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
