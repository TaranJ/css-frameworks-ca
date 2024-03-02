import { load } from "../storage/load.js";
import { APIBase, APIKey, postsURL } from "./constants.js";

export async function deletePost(postId) {
  try {
    const response = await fetch(APIBase + postsURL + `/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    console.log("Post deleted successfully");
    // Optionally, return true or any relevant data to indicate success
    return true;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

// Usage example:
const postIdToDelete = "702"; // Replace with the ID of the post you want to delete
// deletePost(postIdToDelete);
