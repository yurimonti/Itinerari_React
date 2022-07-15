import CheckBoxComponent from "../CheckBoxComponent";

export default function TagInputComponent({
  tag,
  tagValues,
  setTagValues,
  tagIndex,
}) {
  function setValue(event) {
    let value = event.target.value;
    let checked = event.target.checked;
    if (tagValues.filter((t) => t.name === value.name).length <= 0) {
      setTagValues((prev) => {
        prev.push({ tag: value, value: checked });
        return prev;
      });
    } else {
      let tagIndex = tagValues.indexOf(
        tagValues.filter((t) => t.name === value.name)[0]
      );
      setTagValues((prev) => {
        prev[tagIndex] = { tag: value, value: checked };
        return prev;
      });
    }
  }

  return tag.isBooleanType ? (
    <div className="grid grid-cols-2 gap-6">
      <CheckBoxComponent
        keyValue={tag.name}
        value={tagValues.filter(t => t.tag===tag.name)[0]}
        checked={tagValues.filter(t => t.tag===tag.name)[0]}
        setValue={setValue}
      />
      <button type="button" onClick={()=>{alert(tagValues.filter(t => t.tag===tag.name)[0])}} > click</button>
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
        value={tagValues[tagIndex]}
        onChange={(e) => {
          setTagValues((previous) => {
            previous[tagIndex] = e.target.value;
            return previous;
          });
        }}
      />
    </div>
  );
}
