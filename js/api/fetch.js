import { load } from "../storage/load.js";
import { APIBase, APIKey, postsURL } from "./constants.js";

let posts = [];

export async function getPosts() {
  try {
    const response = await fetch(APIBase + postsURL + "?_author=true", {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    posts = await response.json();
    // console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
}

export { posts };
