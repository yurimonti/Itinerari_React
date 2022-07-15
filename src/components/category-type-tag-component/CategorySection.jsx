import { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import CheckBoxComponent from "../CheckBoxComponent";
import InputSelect from "../InputSelect";

export default function CategorySection(props) {
  const [click, setClick] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagValues,setTagValues] = useState([]);

  useEffect(() => {
    getCategories();
    if (props.filledFormData !== null) {
      getTypesFiltered();
      props.filledFormData.types.forEach((type) => {
        return type.tags.forEach((t) => {
          if (!tags.includes(t)) {
            setTags((prev) => {
              prev.push(t);
              return prev;
            });
          }
        });
      });
      props.filledFormData.tagValues.forEach((tv) => {
        /* let tag = tags.filter(t => t.name === tv.tag.name); */
        if (tv.tag.isBooleanType)
          props.tagsAndValue.push({ tag: tv.tag.name, value: tv.booleanValue });
        else
          props.tagsAndValue.push({ tag: tv.tag.name, value: tv.stringValue });
      });
    }
    return () => {
      props.setCategoryValue([]);
      props.setCategories([]);
      props.setTypeValue([]);
      props.setTypes([]);
      props.tagsAndValue.length = 0;
      setTags([]);
      // props.setTagValues([]);
    };
  }, [click]);

  function addTagIfNotExists(tag) {
    if (!tags.includes(tag)) {
      setTags((pre) => {
        pre.push(tag);
        return pre;
      });
      tag.isBooleanType === true
        ? props.tagsAndValue.push({ tag: tag.name, value: false })
        : props.tagsAndValue.push({ tag: tag.name, value: "" });
    }
  }

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
      .post("/api/poiType/all", payload)
      .then((res) => {
        props.setTypes(res.data);
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }

  function addIfNotExistsInTagValues(tag, valueToAdd) {
    if (props.tagsAndValue.filter((t) => t.tag === tag.name).length <= 0) {
      props.tagsAndValue.push({ tag: tag.name, value: valueToAdd });
    } else {
      let index = props.tagsAndValue.findIndex((t) => {
        return t.tag === tag.name;
      });
      if (index !== -1) {
        props.tagsAndValue[index].value = valueToAdd;
      }
    }
  }

  function tagsAndValuesRender(tag, key) {
    let tagIndex = tags.indexOf(tag);
    console.log(tagValues);
    return tag.isBooleanType ? (
      <div className="grid grid-cols-2 gap-6" key={key}>
        <CheckBoxComponent
          value={tagValues[tagIndex]}
          setValue={(e) => {
            setTagValues(prev =>{
              prev.push(e);
              return prev;
            });
            addIfNotExistsInTagValues(tag, e);
          }}
          keyValue={tag.name}
        />
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-6" key={key}>
        <label
          htmlFor={tag.name}
          className="block text-sm font-medium text-gray-700"
        >
          {tag.name}
        </label>
        <textarea
          id={tag.name}
          name={tag.name}
          rows={3}
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-200"
          placeholder={tag.name}
          value={tagValues[tagIndex]}
          onChange={(e) => {
            setTagValues(e.target.value);
            addIfNotExistsInTagValues(e.target.value);
          }}
        />
      </div>
    );
  }

  function renderInputFromType() {
    return props.typeValue.map((type) => {
      return type.tags.map((tag) => {
        //FIXME: rivedere bene
        addTagIfNotExists(tag);
        return tagsAndValuesRender(tag, tag.name);
      });
    });
  }

  return (
    <div>
      {props.filledFormData === null && (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
          <InputSelect
            values={props.categories}
            value={props.categoryValue}
            multiple={true}
            onChange={props.setCategoryValue}
            keyValue="Categorie"
            toView="name"
          />
          <div className="flex-box">
            <button
              type="button"
              onClick={() => {
                if (!click) getTypesFiltered();
                else {
                  props.setCategoryValue([]);
                  props.setTypeValue([]);
                  setTags([]);
                  props.tagsAndValue.length = 0;
                }
                setClick((s) => !s);
              }}
              className="ml-5 mt-1.5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {click ? "cancella" : "conferma"}
            </button>
          </div>
        </div>
      )}
      {click || props.filledFormData !== null ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
          <InputSelect
            values={props.types}
            value={props.typeValue}
            multiple={true}
            onChange={props.setTypeValue}
            keyValue="Types"
            toView="name"
          />
          <div className="flex-box">
            <button
              type="button"
              onClick={() => {
                setClick((s) => {
                  return !s;
                });
              }}
              className="ml-5 mt-1.5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              cancella
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {renderInputFromType()}
      {/* <button
        type="button"
        onClick={() => {
          props.tagsAndValue.map((t) => {
            alert(t.value);
          });
        }}
        className="bg-sky-600"
      >
        click me to alert values of Tags
      </button> */}
    </div>
  );
}
