import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import "./Form.css";

let formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "needs two dude!")
    .required("Name is a required field"),
  size: yup
    .string()
    .oneOf(["Ten", "Twelve", "Fourteen", "Eighteen"])
    .required("You Need to choose a size"),
  cheese: yup.boolean().oneOf([true]),
  pepperoni: yup.boolean().oneOf([true]),
  mushrooms: yup.boolean().oneOf([true]),
  onion: yup.boolean().oneOf([true]),
  special: yup.string()
});

let UserForm = (props) => {
  let [formState, setFormState] = useState({
    name: "",
    size: "",
    cheese: false,
    pepperoni: false,
    mushrooms: false,
    olives: false,
    special: "",
  });

  let [errorState, setErrorState] = useState({
    name: "",
    size: "",
    cheese: false,
    pepperoni: false,
    mushrooms: false,
    olives: false,
    special: ""
  });

  let formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/pizza", formState)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    console.log("Order Placed!");
  };

  let validate = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err.errors);
        setErrorState({
          ...errorState,
          [event.target.name]: err.errors[0],
        });
      });
  };

  let inputChange = (event) => {
    event.persist();
    validate(event);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({ ...formState, [event.target.name]: value });
  };

  return (
    <div>
      <Link to="/">
      <button className="formClose">Close Form</button>
      </Link>
      <form className="form" onSubmit={formSubmit}>
        <label className="" htmlFor="name">
          Your Name: <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={formState.name}
            onChange={inputChange}
          />
          {errorState.name.length > 0 ? (
            <p className="error">{errorState.name}</p>
          ) : null}
        </label>
        <br />
        <label>
          Pizza Size: <br />
          <select
            name="size"
            id="size"
            value={formState.size}
            onChange={inputChange}
          >
            <option value="Ten">10 Inch Pizza</option>
            <option value="Twelve">12 Inch Pizza</option>
            <option value="Fourteen">14 Inch Pizza</option>
            <option value="Eighteen">18 Inch Pizza</option>
          </select>
        </label>
        <br />
        <label className="" htmlFor="checkbox">
          Cheese <br />
          <input
            type="checkbox"
            name="cheese"
            id="cheese"
            checked={formState.terms}
            onChange={inputChange}
          />
        </label>
        <br />
        <label className="" htmlFor="checkbox">
          Pepperoni <br />
          <input
            type="checkbox"
            name="pepperoni"
            id="pepperoni"
            checked={formState.terms}
            onChange={inputChange}
          />
        </label>
        <br />
        <label className="" htmlFor="checkbox">
          Mushrooms <br />
          <input
            type="checkbox"
            name="mushrooms"
            id="mushrooms"
            checked={formState.terms}
            onChange={inputChange}
          />
        </label>
        <br />
        <label className="" htmlFor="checkbox">
          Onion <br />
          <input
            type="checkbox"
            name="onion"
            id="onion"
            checked={formState.terms}
            onChange={inputChange}
          />
        </label>
        <br />
        <label>
          Special Instructions:
          <br />
          <textarea
            type="text"
            name="special"
            id="special"
            placeholder="Any Special Instructions?"
            value={formState.special}
            onChange={inputChange}
          />
        </label>
        <br />
        <button className="submitButton">Place Order</button>
      </form>
    </div>
  );
};

export default UserForm;
