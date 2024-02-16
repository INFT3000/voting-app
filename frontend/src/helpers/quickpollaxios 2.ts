import axios from "axios";

export const QpAxios = axios.create({
  baseURL: "http://localhost:8080/api/",
  //   timeout: 1000,
  headers: {
    Accept: "application/json",
    // 'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});
