
/**
 * API for CRUD with the backend.
 */

import { get } from "./fetch";

export type UserType = {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
}

/**
 * This function will perform simple search for user based on the username, possibly null. 
 * or first and/or last name
 * @param username - the username is the email of the user.
 */
export async function getAllUsersByUsername({ username = "" }: { username: string }): Promise<{data: UserType[] | null, ok: boolean}> {
    const resp = await get("/users/q?" + new URLSearchParams({ username: username }).toString()) ;
    return {data : await resp.json(), ok: resp.ok};
}