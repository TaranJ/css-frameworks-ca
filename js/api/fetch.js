import { load } from "../storage/load.js";
import { APIBase, APIKey, postsURL } from "./constants.js";

export async function getPosts() {
  const response = await fetch(APIBase + postsURL, {
    headers: {
      Authorization: `Bearer ${load("token")}`,
      "X-Noroff-API-Key": APIKey,
    },
  });
  return await response.json();
}
