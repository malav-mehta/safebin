import axios from "axios";

const instance = axios.create({
  baseURL: "http://18.117.95.7:3000/api/v1",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
