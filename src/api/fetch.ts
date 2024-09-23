import { getLocalToken } from ".";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const HttpMethod = Object.freeze({
  Post: "POST",
  Get: "GET",
  Put: "PUT",
  Delete: "DELETE",
  Patch: "PATCH"
});
const { Post, Get, Put, Delete } = HttpMethod;
/**
 * 
 * @param endpoint - make sure to have the / e.g.: "/tasks" or "/todo/2".
 * @returns Task
 */
export async function get(endpoint: string) {
  const resp = await fetch(BACKEND_URL + endpoint, {
    method: Get,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getLocalToken()
    }
  })

  try {
    return await resp.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Response("Unusual situation", { status: resp.status });
    }
  }
}


export async function post<T>(endpoint: string, data: T) {
  const resp = await fetch(BACKEND_URL + endpoint, {
    method: Post,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getLocalToken()
    },
    body: JSON.stringify(data),
  })
  return resp;
}

export async function put<T>(endpoint: string, data: T) {
  const resp = await fetch(BACKEND_URL + endpoint, {
    method: Put,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getLocalToken()
    },
    body: JSON.stringify(data),
  })
  return resp;
}

export async function del(endpoint: string) {

  const resp = await fetch(BACKEND_URL + endpoint, {
    method: Delete,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getLocalToken()
    }
  })
  return resp;
}