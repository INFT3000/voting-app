import axios from "axios";
import useAxios, { configure } from "axios-hooks";

export const QpAxios = axios.create({
  baseURL: "https://quickpoll.ca/api/", // TO-DO: Change to env variable
  //   timeout: 1000,
  headers: {
    Accept: "application/json",
    // 'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

configure({
  axios: QpAxios,
});

const useQpAxios = useAxios;

export default useQpAxios;
