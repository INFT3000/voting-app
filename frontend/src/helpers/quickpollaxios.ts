import axios from "axios";
import useAxios, { configure } from "axios-hooks";

export const QpAxios = axios.create({
  baseURL: "http://localhost:8080/api", // TO-DO: Change to env variable
  //   timeout: 1000,
  headers: {
    Accept: "application/json",
    Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : undefined,
  },
});

configure({
  axios: QpAxios,
});

export function setToken(token: string): void {
  localStorage.setItem("token", token);
  QpAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  configure({
    axios: QpAxios,
  });
}

const useQpAxios = useAxios;

export default useQpAxios;
