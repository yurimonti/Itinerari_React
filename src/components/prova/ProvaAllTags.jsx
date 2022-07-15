import { useState } from "react";
import CheckBoxComponent from "../CheckBoxComponent";

export default function ProvaAllTags() {
  const [tags, setTags] = useState([
    {
      name: "accessibilita disabili",
      isBooleanType: true,
    },
    {
      name: "ingresso animali",
      isBooleanType: true,
    },
  ]);
  const [tagValues, setTagValues] = useState([
    {
      tag: "accessibilita disabili",
      value: false,
    },
    {
      tag: "ingresso animali",
      value: false,
    },
  ]);

  function setValue(event) {
    let value = event.target.value;
    let checked = event.target.checked;
    if (
      tagValues.filter((t) => t.tag === value).length <= 0 ||
      tagValues.length <= 0
    ) {
      setTagValues((prev) => {
        prev.push({ tag: value, value: checked });
        return prev;
      });
    } else {
      let tagIndex = tagValues.indexOf(
        tagValues.filter((t) => t.tag === value.tag)[0]
      );
      setTagValues((prev) => {
        prev[tagIndex] = { tag: value, value: checked };
        return prev;
      });
    }
  }

  function renderTypes() {
    return tags.map((t) => {
      let tagIndex = tagValues.indexOf(
        tagValues.filter((tv) => t.name === tv.tag)[0]
      );
      return (
        <div key={t.id + "" + t.name}>
          <CheckBoxComponent
            keyValue={t.name}
            value={tagValues[tagIndex]}
            setValue={setValue}
          />
          <button
            type="button"
            onClick={() => {
              console.log(tagValues[tagIndex]);
            }}
          >
            click
          </button>
        </div>
      );
    });
  }

  return (
    <>
      {renderTypes()}
      <button
        type="button"
        onClick={() => {
          console.log(tagValues);
        }}
      >
        click
      </button>
    </>
  );
}
