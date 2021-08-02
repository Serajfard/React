import React, { useState } from "react";
import BaseForm from "./baseform";
import Joi from "joi-browser";
// import auth from "../../services/authService";
import { toast } from "react-toastify";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../authContext";

const Login = () => {
  let history = useHistory();
  let location = useLocation();

  const auth = useAuth();

  let [state, setState] = useState({
    data: {
      username: "",
      password: "",
    },
    errors: {},
  });

  let schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  let { renderInput, renderSubmit, handleSubmit } = BaseForm(
    state,
    setState,
    schema,
    onSubmit
  );

  async function onSubmit() {
    try {
      const { username, password } = state.data;
      await auth.login(username, password);

      // window.location = location.state ? location.state.from.pathname : "/";
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = state.errors;
        errors.username = ex.response.data;
        setState({ data: { ...state.data }, errors });
        toast.error(ex.response.data);
      }
    }
  }
  // console.log("return (render)");
  return (
    <div>
      {auth.getUser() ? (
        <Redirect to="/" />
      ) : (
        <form onSubmit={handleSubmit}>
          {renderInput("username", "Username")}
          {renderInput("password", "Password", "password")}
          {renderSubmit("Login", true)}
        </form>
      )}
    </div>
  );
};

export default Login;
