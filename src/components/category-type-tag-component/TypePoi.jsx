import InputSelect from "../InputSelect";
import { useEffect, useState } from "react";
import { publicInstance } from "../../api/axiosInstance";
import CheckBoxComponent from "../CheckBoxComponent";
import TagInputComponent from "./TagInputComponent";

const data = {
  id: 1,
  name: "Mulino Bottacchiari",
  description: "prova prova, 1,2,3, prova",
  coordinate: {
    id: 210,
    lat: 43.1658,
    lon: 13.0584,
    alt: null,
  },
  hours: {
    id: 0,
    monday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    tuesday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    wednesday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    thursday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    friday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    saturday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    sunday: ["08:00:00", "13:00:00", "14:00:00", "20:00:00"],
    isOpen: true,
  },
  timeToVisit: null,
  address: null,
  ticketPrice: null,
  contributors: [],
  link: null,
  types: [
    {
      name: "Mulino",
      categories: [
        {
          name: "Architetturale",
        },
        {
          name: "Culturale",
        },
      ],
      tags: [
        {
          name: "accessibilita disabili",
          isBooleanType: true,
        },
        {
          name: "ingresso animali",
          isBooleanType: true,
        },
      ],
    },
  ],
  contact: null,
  tagValues: [
    {
      id: 194,
      tag: {
        name: "ingresso animali",
        isBooleanType: true,
      },
      booleanValue: true,
      stringValue: null,
    },
    {
      id: 201,
      tag: {
        name: "accessibilita disabili",
        isBooleanType: true,
      },
      booleanValue: true,
      stringValue: null,
    },
  ],
};

export default function TypePoi(
  { isPoi } /* {
  isPoi,
  types,
  setTypes,
  typeValues,
  setTypeValues,
  tags,
  setTags,
  tagValues,
  setTagValues,
  click,
  setClick,
} */
) {
  const [types, setTypes] = useState([]);
  const [typeValues, setTypeValues] = useState([]);
  const [tags, setTags] = useState([]);
  const [click, setClick] = useState(false);
  const [poi, setPoi] = useState({});
  const [tagValues, setTagValues] = useState([]);
  //---------------------------------------------call APIs-----------------------------------------

  function getTypesFiltered() {
    let payload = [];
    publicInstance
      .post("/api/poiType/all", payload)
      .then((res) => {
        setTypes(res.data);
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  }
  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getTypesFiltered();
    //FIXME: ricontrollare
    /* if (isPoi) {
      setTypeValues(data.types);
      data.tagValues.forEach((tv) => {
        let value = tv.tag.isBooleanType ? tv.booleanValue : tv.stringValue;
        setTags((prev) => {
          prev.push(tv.tag);
          return prev;
        });
        setTagValues((prev) => {
          prev.push(value);
          return prev;
        });
      });
    } */
    return () => {
      setTypes([]);
      setTypeValues([]);
      setTags([]);
      setTagValues([]);
    };
  }, []);

  //--------------------------------some functions-----------------------------------------------------

  function setTagForSelectedTypes(typesToAdd) {
    typesToAdd.forEach((type) => {
      type.tags.forEach((tag) => {
        /* let emptyValue = tag.isBooleanType ? false : ""; */
        if (tags.filter((t) => t.name === tag.name).length <= 0) {
          setTags((previous) => {
            previous.push(tag);
            return previous;
          });
          /* setTagValues((previous) => {
            previous.push(emptyValue);
            return previous;
          }); */
        }
      });
    });
  }
  //--------------------------------render functions---------------------------------------------------

  function renderTagsFromSelectedTypes() {
    return tags.map((tag) => {
      let tagIndex = tags.indexOf(tag);
      let key = tag.id + " " + tag.name;
      return (
        <TagInputComponent
          key={key}
          tag={tag}
          tagValues={tagValues}
          setTagValues={setTagValues}
          tagIndex={tagIndex}
        />
      );
    });
  }

  //--------------------------------render Component---------------------------------------------------
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
        {/* --------------------------select box----------------------------------- */}
        <InputSelect
          values={types}
          value={typeValues}
          multiple={true}
          onChange={(valueToChange) => {
            setTypeValues(valueToChange);
            setTagForSelectedTypes(valueToChange);
          }}
          keyValue="Types"
          toView="name"
        />
        {/* ----------------------------bottone cancellazione----------------------------------------- */}
        <div className="flex-box">
          <button
            type="button"
            onClick={() => {
              setTypeValues([]);
              setTags([]);
              setTagValues([]);
            }}
            className="ml-5 mt-1.5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            cancella
          </button>
        </div>
        {/* ----------------------------render Tags Input----------------------------------------- */}
      </div>
      {renderTagsFromSelectedTypes()}
      <button
        type="button"
        className="block bg-sky-300"
        onClick={() => console.log(tagValues)}
      >
        Click To Print on console Tag Values
      </button>
    </>
  );
}
