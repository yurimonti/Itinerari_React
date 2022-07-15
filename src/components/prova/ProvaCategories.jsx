import { useState, useEffect } from "react";
import CheckBoxComponent from "../CheckBoxComponent";
import { publicInstance } from "../../api/axiosInstance";
import InputSelect from "../InputSelect";

export default function ProvaCategories({
  tagValues,
  setTagValues,
  categories,
  setCategories,
  categoryValues,
  setCategoryValues,
  types,
  setTypes,
  typeValues,
  setTypeValues,
}) {
  //const [click, setClick] = useState(false);
  /* const [tagValues, setTagValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValues] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeValues, setTypeValues] = useState([]); */
  //---------------------------------------APIs call----------------------------------

  function getAllCategories() {
    publicInstance
      .get("/api/category/all")
      .then((res) => {
        setCategories(res.data);
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTypesFiltered(filter) {
    let payload = filter;
    publicInstance
      .post("/api/poiType/all", payload)
      .then((res) => {
        setTypes(res.data);
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  //--------------------------------------useEffect----------------------------------
  useEffect(() => {
    getAllCategories();
    /*     getTypesFiltered(categories); */
    return () => {
      setCategoryValues([]);
      setCategories([]);
      setTypeValues([]);
      setTypes([]);
      setTagValues([]);
    };
  }, []);

  //---------------------------------------some functions----------------------------------

  function initTagsFromSelectedTypes(typeValuesToAdd) {
    if (typeValuesToAdd.length === 0) setTagValues([]);
    else {
      setTypeValues(typeValuesToAdd);
      typeValuesToAdd.forEach((toAdd) => {
        toAdd.tags.forEach((t) => {
          if (tagValues.filter((tv) => tv.tag === t.name).length <= 0) {
            let defaultTagValue = t.isBooleanType ? false : "";
            setTagValues((prev) => {
              prev.push({ tag: t.name, value: defaultTagValue });
              return prev;
            });
            console.log(tagValues);
          }
        });
      });
    }
  }

  /**
   * change checked value in a checkbox
   * @param {*} event event to handle
   * @param {*} tagValue tagValue from map
   */
  function handleCheckTagInput(event, tagValue) {
    let checkedEvent = event.target.checked;
    console.log(tagValues);
    setTagValues(
      tagValues.map((v) => {
        if (v.tag === tagValue.tag) {
          v.value = checkedEvent;
        }
        return v;
      })
    );
  }

  function renderAllTags() {
    return tagValues.map((v) => {
      return (
        <CheckBoxComponent
          onChange={(e) => {
            handleCheckTagInput(e, v);
          }}
          tagValue={v}
          key={v.tag}
          keyValue={v.tag}
        />
      );
    });
  }

  //---------------------------------------return Component----------------------------------
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
        <InputSelect
          values={categories}
          value={categoryValues}
          multiple={true}
          onChange={(values) => {
            setCategoryValues(values);
            getTypesFiltered(values);
          }}
          keyValue="Categorie"
          toView="name"
        />
        {/* ----------------------------bottone cancellazione----------------------------------------- */}
        <div className="flex-box">
          <button
            type="button"
            onClick={() => {
              setCategoryValues([]);
              setTypeValues([]);
              getTypesFiltered(categoryValues);
              setTagValues([]);
            }}
            className="ml-5 mt-1.5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            cancella
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
        {/* --------------------------select box----------------------------------- */}
        <InputSelect
          values={types}
          value={typeValues}
          multiple={true}
          onChange={initTagsFromSelectedTypes}
          keyValue="Types"
          toView="name"
        />
      </div>
      {/* //-------------------------tags------------------------------------ */}
      {renderAllTags()}
    </>
  );
}
