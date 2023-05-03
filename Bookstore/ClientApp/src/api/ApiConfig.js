import axios from "axios";

export class ApiConfig {
  constructor() {
    this.url =
      process.env.REACT_APP_API_URL || env.ASPNETCORE_HTTPS_PORT
        ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
        : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(";")[0]
        : "http://localhost:34724";

    this.host = axios.create({
      baseURL: this.url,
    });

    this.authHost = axios.create({
      baseURL: this.url,
    });

    const authInterceptor = (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    };

    this.authHost.interceptors.request.use(authInterceptor);
  }

  get host() {
    return this.host;
  }
  get authHost() {
    return this.authHost;
  }
}