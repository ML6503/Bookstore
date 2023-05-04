import axios from "axios";


export class ApiConfig {
  constructor() {
    this.URL =
        process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL 
        : "https://localhost:7097/";
           // : "http://localhost:44492";

    this.host = axios.create({
      baseURL: this.URL,
    });

    this.authHost = axios.create({
      baseURL: this.URL,
    });

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    };

    this.authHost.interceptors.request.use(authInterceptor);
  }

  getHost() {
    return this.host;
  }
  getAuthHost() {
    return this.authHost;
  }
}