import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("unexcpected error : ", error);
    toast.error("unexcpected error");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-session-token"] = jwt;
}
const exportObj = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt,
};
export default exportObj;
