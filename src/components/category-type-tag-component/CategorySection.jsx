import { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import InputSelect from "../InputSelect";

export default function CategorySection(props) {
  const [click, setClick] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getCategories();
    return () => {
      props.setCategoryValue([]);
      props.setCategories([]);
      props.setTypeValue([]);
      props.setTypes([]);
      setTags([]);
      // props.setTagValues([]);
    };
  }, []);

  function addTagIfNotExists(tag) {
    if (!tags.includes(tag))
      setTags((pre) => {
        pre.push(tag);
        return pre;
      });
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

  function renderInputFromType() {
    return props.typeValue.map((type) => {
      return type.tags.map((tag) => {
        //FIXME: rivedere bene
        addTagIfNotExists(tag);
        return (
          <TagsValuesComponent
            key={type.name + tag.name}
            tag={tag}
            tags={tags}
            tagRelValue={props.tagsAndValue}
          />
        );
      });
    });
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
        <InputSelect
          values={props.categories}
          value={props.categoryValue}
          multiple={true}
          onChange={props.setCategoryValue}
          keyValue="Categories"
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
              }
              setClick((s) => !s);
            }}
            className="ml-5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {click ? "delete" : "confirm"}
          </button>
        </div>
      </div>
      {click ? (
        <div className="grid flex grid-cols-1 gap-6">
          <InputSelect
            values={props.types}
            value={props.typeValue}
            multiple={true}
            onChange={props.setTypeValue}
            keyValue="Types"
            toView="name"
          />
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

function TagsValuesComponent({ tag, tags, setTagsAndValue, tagRelValue }) {
  const [tagValue, setTagValue] = useState("");
  const [tagValues, setTagValues] = useState(["true", "false"]);

  //FIXME: rivedere bene
  function addIfExists(valueToAdd) {
    if (
      !tagRelValue.includes((t) => {
        return t.tag === tag.name;
      })
    )
      tagRelValue.push({ tag: tag.name, value: valueToAdd });
    else {
      let index = tagRelValue.findIndex((t) => {
        return t.tag === tag.name;
      });
      if (index !== -1) {
        tagRelValue[index].value = valueToAdd;
      }
    }
  }

  return tag.isBooleanType ? (
    <div className="grid grid-cols-2 gap-6">
      <InputSelect
        values={tagValues}
        value={tagValue}
        onChange={(e) => {
          setTagValue(e);
          addIfExists(e);
        }}
        keyValue={tag.name}
      />
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-6">
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
        value={tagValue}
        onChange={(e) => {
          setTagValue(e.target.value);
          addIfExists(e.target.value);
        }}
      />
    </div>
  );
}
