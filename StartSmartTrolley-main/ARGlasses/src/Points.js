import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Points(props) {
  console.log(props.st.points);

  const getNumber = (label) => {
    var number = 0;
    props.st.entrys.forEach((entry) => {
      if (entry.name == label) {
        number = entry.value - entry.currentValue;
      }
    });
    return number;
  };

  return (
    <div>
      {props.st.points.map((p) => (
        <span
          id={p.label}
          class="position-absolute p-1 badge bg-success rounded-pill "
          style={{
            left: p.x,
            top: p.y,
          }}
        >
          {getNumber(p.label)}
        </span>
      ))}
    </div>
  );
}

export default Points;
