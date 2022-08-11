import React from "react";

function InstructionsComponent({ geojson }) {
  function directive() {
    return geojson.features[0].properties.segments.map((segment) => {
      return segment.steps.map((step) => {
        return (
          <li className="text-sm md:text-md" key={Math.random()}>
            {step.instruction}
          </li>
        );
      });
    });
  }

  return (
    <ol
      className="ml-5 text-center sm:text-left "
      style={{ listStyleType: "number" }}
    >
      {directive()}
    </ol>
  );
}

export default InstructionsComponent;
