import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Entry from "./Entry";

function List(props) {
  return (
    <div class="container-sm position-absolute w-25 m-2">
      <table class="table table-secondary table-sm caption-top">
        <caption class="bg-light text-dark">Trolley {props.st.trolley}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        {props.st.entrys.map((entry) => (
          <Entry
            key={entry.id}
            name={entry.name}
            currentValue={entry.currentValue}
            value={entry.value}
          />
        ))}
      </table>
    </div>
  );
}

export default List;
