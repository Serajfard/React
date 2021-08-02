import Joi from "joi-browser";
import BaseForm from "./baseform";
import { useState } from "react";

const Register = () => {
  let [state, setState] = useState({
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  });

  let schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  let { renderInput, renderSubmit, handleSubmit } = BaseForm(
    state,
    setState,
    schema,
    onSubmit
  );

  function onSubmit() {
    console.log("onSubmit");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderSubmit("Register", true)}
      </form>
    </div>
  );
};

export default Register;
