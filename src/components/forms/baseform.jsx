import Input from "../common/input";
import Select from "../common/select";
import React from "react";
import Joi from "joi-browser";
const BaseForm = (state, setState, schema, onSubmit) => {
  // valueField : name of id field in data set for using in select/option compnent
  // textField : name of text field in data for using in select/option compnent
  let onChange = function ({ currentTarget: input }, valueField, textField) {
    const data = { ...state.data };
    const errors = { ...state.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let result = input.value;

    if (valueField && textField) {
      const selectedItem = input.options[input.options.selectedIndex];
      result = {
        [valueField]: selectedItem.value,
        [textField]: selectedItem.text,
      };
    }

    data[input.name] = result;
    setState({ ...state, data, errors });
  };

  let renderInput = function (name, label, type = "text") {
    return (
      <Input
        value={state.data[name]}
        name={name}
        type={type}
        label={label}
        onChange={onChange}
        error={state.errors[name]}
      />
    );
  };
  let renderSelect = function (name, label, valueField, textField, options) {
    return (
      <Select
        value={state.data[name][valueField]}
        name={name}
        label={label}
        valueField={valueField}
        textField={textField}
        options={options}
        onChange={(e) => onChange(e, valueField, textField)}
      />
    );
  };
  let renderSubmit = function (label, disableIfFormIsInvalid = false) {
    return (
      <button
        disabled={disableIfFormIsInvalid && validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  function validate() {
    let option = { abortEarly: false };
    let { error } = Joi.validate(state.data, schema, option);

    if (!error) return null;

    let errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const sch = { [name]: schema[name] };
    let { error } = Joi.validate(obj, sch);

    return error ? error.details[0].message : null;
  }

  let handleSubmit = function (e) {
    e.preventDefault();

    const errors = validate();
    setState({ ...state, errors: errors || {} });

    if (errors) return;

    onSubmit();
  };

  return {
    onChange,
    renderInput,
    renderSelect,
    renderSubmit,
    handleSubmit,
  };
};

export default BaseForm;
