import { UnauthorizedException } from "@/utils/exceptions/custom-exceptions";
import { getLocalToken } from ".";
const BACKEND_URL :string = import.meta.env.VITE_BACKEND_URL;

export const HttpMethod = Object.freeze({
  Post: "post" ,
  Get: "get",
  Put: "put",
  Delete: "delete",
  Patch: "patch"
});




const { Post, Get, Put, Delete } = HttpMethod;
/**
 * 
 * 
 * @param endpoint - make sure to have the / e.g.: "/tasks" or "/todo/2".
 * @returns Task
 */
export async function get(endpoint: string): Promise<Response> {

  const resp = await fetch(BACKEND_URL + endpoint, {
    method: Get,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getLocalToken()
    }
  })
  
  if (resp.status === 401) throw new UnauthorizedException();
  return resp;
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
  if (resp.status === 401) throw new UnauthorizedException();
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
  if (resp.status === 401) throw new UnauthorizedException();
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
  if (resp.status === 401) throw new UnauthorizedException();
  return resp;
}