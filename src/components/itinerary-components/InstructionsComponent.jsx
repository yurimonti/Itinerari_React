import React from "react";
import '../../styles/listStyle.css';

//Component that render instructions for a direction
function InstructionsComponent({ geojson }) {
  function directive() {
    return geojson.features[0].properties.segments.map((segment) => {
      return segment.steps.map((step) => {
        return (
          <li key={Math.random()}>
            {step.instruction}
          </li>
        );
      });
    });
  }

  return (
    <ol>
      {directive()}
    </ol>
  );
}

export default InstructionsComponent;
