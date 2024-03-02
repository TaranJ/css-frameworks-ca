import { load } from "../storage/load.js";
import { APIBase, APIKey, postsURL } from "./constants.js";

export async function createPost(postData) {
  try {
    const response = await fetch(APIBase + postsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const responseData = await response.json();
    console.log("Post created successfully:", responseData);
    return responseData; // Optionally, return the response data
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

// Usage example:
export const newPostData = {
  title: "New Post",
  // Include any other properties required by the API
};

// createPost(newPostData);
