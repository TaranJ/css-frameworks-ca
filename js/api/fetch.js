import { load } from "../storage/load.js";
import { APIBase, APIKey, postsURL } from "./constants.js";

// Represents an array of posts obtained from the API
let posts = [];

// Retrieves the query string from the current URL
const queryString = document.location.search;
// Parses the query string to extract URL parameters
const params = new URLSearchParams(queryString);
// Retrieves the value of the "id" parameter from the URL.
const id = params.get("id");

// Fetches posts from the API
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
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
}

export { posts };

export async function getSinglePost() {
  try {
    const response = await fetch(APIBase + postsURL + "/" + id + "?_author=true", {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}
