"use client";
import { parseCookies } from "nookies";

const fetchData = async (url: string, method = "GET", body: any = null) => {
  try {
    const cookies = parseCookies();
    const token = cookies.jwt;

    const requestOptions: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, requestOptions);

    if (method !== "DELETE" && method !== "PUT") {
      return response.json();
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (url: string) => {
  try {
    const response = await fetchData(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await fetchData(url, "POST", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const putData = async (url: string, data: any) => {
  try {
    const response = await fetchData(url, "PUT", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    const response = await fetchData(url, "DELETE");
    return response;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (url: string, data: any) => {
  try {
    const response = await fetchData(url, "PATCH", data);
    return response;
  } catch (error) {
    throw error;
  }
};
