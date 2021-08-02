import http from "../services/httpService";
import { useState } from "react";
import authService from "../services/authService";

// http.setJwt(getJwtToken());
const tokenVariableName = "token";

export default function useAuthProvider() {
  const [JWT, setJWTState] = useState(null);

  function setJWT(jwt) {
    setJWTState(jwt);
    http.setJwt(jwt);
  }

  async function login(username, password) {
    // http backend login call and get jwt

    try {
      const jwt = await authService.login(username, password);

      localStorage.setItem(tokenVariableName, JSON.stringify(jwt));
      setJWT(jwt);

      return Promise.resolve(jwt);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  function getUser() {
    const user = JWT;
    // decode jwt
    return user;
  }

  function logout() {
    localStorage.removeItem(tokenVariableName);
    setJWT(null);
  }

  function getJwtToken() {
    return JWT;
  }

  function loadJWT() {
    const jwtString = localStorage.getItem(tokenVariableName);
    if (jwtString && !JWT) {
      const jwt = JSON.parse(jwtString);
      setJWT(jwt);
    }
  }

  return {
    login,
    getUser,
    logout,
    getJwtToken,
    loadJWT,
  };
}
