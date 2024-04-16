"use client";

import axios from "axios";
import useAxios, { configure } from "axios-hooks";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  authorized: boolean,
  exp?: number,
  user_id: number,
}

export const QpAxios = axios.create({
  baseURL: "http://localhost:8080/api", // TO-DO: Change to env variable
  //   timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

configure({
  axios: QpAxios,
});

export function setToken(token: string): void {
  localStorage.setItem("token", token);
  console.log(jwtDecode(token));
  QpAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  configure({
    axios: QpAxios,
  });
}

export function getToken(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function getUserData(): JwtPayload | null {
  const token = getToken();
  if (token) {
    const decoded = decodeToken(token);
    if (decoded) {
      console.log("Decoded JWT:", decoded);
      return decoded;
    }
  }
  return null;
}

const useQpAxios = useAxios;

export default useQpAxios;
