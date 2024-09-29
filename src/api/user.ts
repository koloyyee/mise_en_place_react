
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
export async function getAllUsersByUsername({ username = "" }: { username: string }): Promise<UserType[] | Error | null> {
  try {
    return await get<UserType>("/users/q?" + new URLSearchParams({ username: username }).toString()) as UserType[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return null;
}