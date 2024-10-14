import axios from "axios";

const calendarApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//type configOptions = InternalAxiosRequestConfig<any> & { headers: any };
interface configOptions {
  headers: any; ///any
}

// INTERCEPTORES
calendarApi.interceptors.request.use((config: configOptions) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default calendarApi;
