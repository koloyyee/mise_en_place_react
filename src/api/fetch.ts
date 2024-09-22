import { getLocalToken } from ".";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


/**
 * 
 * @param endpoint - make sure to have the / e.g.: "/tasks" or "/todo/2".
 * @returns Task
 */
export async function get(endpoint: string ) {
  const token = getLocalToken();
  const resp = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "GET",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
 return await resp.json();
}


export async function post<T>(endpoint:string, data: T) {

  const token = getLocalToken();
  const resp = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "POST",
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + token
    },
    body : JSON.stringify(data),
  })
  return resp;
}