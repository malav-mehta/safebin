import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.21.19.144:3000/api/v1",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
