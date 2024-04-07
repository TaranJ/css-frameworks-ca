import { load } from "../storage/load.js";
import { APIBase, APIKey, postsURL } from "./constants.js";
import { getSinglePost } from "./fetch.js";

/**
 * Deletes a post from the server.
 * @async
 * @param {number} postId - The ID of the post to delete.
 * @returns {Promise<boolean>} A Promise that resolves to true if the post is deleted successfully.
 * @throws {Error} If the request fails or an error occurs during processing.
 */
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
    return true;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error;
  }
}

/**
 * Handles the deletion of a post.
 * Retrieves the ID of the single post and then deletes it.
 * Redirects the user to the feed page after successful deletion.
 */
export async function handlePostDeletion(event) {
  const result = await getSinglePost();
  const postIDToDelete = result.data.id;

  try {
    await deletePost(postIDToDelete);
    window.location.href = "/feed/index.html";
  } catch (error) {
    console.log("something is rotten in the state of denmark");
  }
}
