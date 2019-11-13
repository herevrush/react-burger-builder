import React from "react";
import "./Input.css";

function Input(props) {
  let inputElem = null;
  let errorMessages = null;

  const classes = ["InputElement"];

  if (props.invalid && props.shouldValidate && props.touched) {
    errorMessages = "Please enter a valid " + props.label;
    classes.push("Invalid");
  }
  const classNames = classes.join(" ");
  switch (props.type) {
    case "input":
      inputElem = (
        <input
          type="input"
          className={classNames}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          type="input"
          className={classNames}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElem = (
        <select
          className={classNames}
          onChange={props.changed}
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
          className={classNames}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
  }
  return (
    <div className="Input">
      <label className="InputLabel"> {props.label}</label>
      {inputElem}
      <p className="ValidationError">{errorMessages}</p>
    </div>
  );
}

export default Input;
