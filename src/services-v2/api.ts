import { GetCookie } from "@/function/cookie/cookie";
import { ApiResponse } from "@/types/common-types";
// import Cookies from "js-cookie";

const BASE_URL = "https://test.dvst.ir";

const getAuthHeaders = (contentType?: string): HeadersInit => {
  const token = GetCookie("authToken");
  let headers: HeadersInit = {
    Accept: "application/json",
  };

  if (contentType) {
    headers = {
      ...headers,
      "Content-Type": contentType,
    };
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const api = {
  get: async <T>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    const headers = getAuthHeaders();
    const response = await fetch(BASE_URL + url, {
      ...options,
      headers: { ...headers, ...options?.headers },
    });
    return await response.json();
  },

  post: async <T>(
    url: string,
    body: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    let headers: HeadersInit;
    let processedBody: string | FormData;

    if (body instanceof FormData) {
      headers = getAuthHeaders();
      processedBody = body;
    } else {
      headers = getAuthHeaders("application/json");
      processedBody = JSON.stringify(body);
    }

    const payload = {
      ...options,
      headers: { ...headers, ...options?.headers },
      method: "POST",
      body: processedBody,
    };

    const response = await fetch(BASE_URL + url, payload);
    return await response.json();
  },

  patch: async <T>(
    url: string,
    body: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    const headers = getAuthHeaders();
    const payload = {
      ...options,
      withCredentials: true,
      headers: { ...headers, ...options?.headers },
      method: "PATCH",
      body: JSON.stringify(body),
    };
    const response = await fetch(BASE_URL + url, payload);
    return await response.json();
  },

  delete: async <T>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    const headers = getAuthHeaders();
    const payload = {
      ...options,
      withCredentials: true,
      headers: { ...headers, ...options?.headers },
      method: "DELETE",
    };
    const response = await fetch(BASE_URL + url, payload);
    return await response.json();
  },
};

export default api;
