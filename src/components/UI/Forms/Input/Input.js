import React from "react";
import "./Input.css";

function Input(props) {
  let inputElem = null;
  switch (props.type) {
    case "input":
      inputElem = (
        <input
          type="input"
          className="InputElement"
          onChange={props.onChange}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          type="input"
          className="InputElement"
          onChange={props.onChange}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElem = (
        <select
          className="InputElement"
          onChange={props.onChange}
          {...props.elementConfig}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {" "}
              {option.name}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElem = (
        <input
          type="input"
          className="InputElement"
          onChange={props.onChange}
          {...props.elementConfig}
        />
      );
  }
  return (
    <div className="Input">
      <label className="InputLabel"> {props.label}</label>
      {inputElem}
    </div>
  );
}

export default Input;
