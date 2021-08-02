// import http from "./httpService";

async function login(username, password) {
  // http backend login call and get jwt
  if (username === "amin@gmail.com" && password === "123") {
    const fakeJWT = {
      usename: "amin@gmail.com",
      name: "Amin",
      family: "Seraj",
    };

    return Promise.resolve(fakeJWT);
  } else {
    return Promise.reject({
      response: { status: 400, data: "invalid username" },
    });
  }
}

const exportObj = {
  login,
};

export default exportObj;
