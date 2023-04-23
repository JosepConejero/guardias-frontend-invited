import axios from "axios";
/* import { getEnvVariables } from "../helpers";

const { REACT_APP_API_URL } = getEnvVariables;
//console.log("SHOW: ", REACT_APP_API_URL);
console.log("SHOW: ", process.env.REACT_APP_API_URL); */

//console.log(process.env.REACT_APP_API_URL);

const calendarApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// INTERCEPTORES
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default calendarApi;
