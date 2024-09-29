
/**
 * API for CRUD with the backend.
 */

import { get, post } from "./fetch";

export type UserType = {
  id?: number;
  username: string;
  authority: string;
  firstName?: string;
  lastName?: string;
}

export type UserProfileType = {
  username: string;
  firstName?: string;
  lastName?: string;
}

/**
 * This function will perform simple search for user based on the username, possibly null. 
 * or first and/or last name
 * @param username - the username is the email of the user.
 */
export async function getAllUsersByUsername( username :   string = "" ): Promise<{data: UserType[] | null, ok: boolean}> {
    const resp = await get("/users/q?" + new URLSearchParams({ username: username }).toString()) ;
    return {data : await resp.json(), ok: resp.ok};
}

/**
 * Get the user with 
 * @param username - the username is the email of the user.
 * @returns 
 */
export async function getUserByUsername(username: string){
  const resp = await get("/users?" + new URLSearchParams({username}).toString());
  return {data: await resp.json() as UserType, ok : resp.ok};
}

export async function updateProfile(formData : FormData) {
  const userProfile = Object.fromEntries(formData) as UserProfileType;
  const resp = await post<UserProfileType>("/users/profile", userProfile );
  return { data: await resp.json() as UserProfileType, ok: resp.ok };
}