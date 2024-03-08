import { load } from "../storage/load.js";
import { delBtn } from "../ui/constants.js";
import { APIBase, APIKey, postsURL } from "./constants.js";
import { getSinglePost } from "./fetch.js";

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

export async function handlePostDeletion(event) {
  const result = await getSinglePost();
  const postIDToDelete = result.data.id;

  try {
    await deletePost(postIDToDelete);
    window.location.href = "/feed/index.html";
  } catch (error) {
    console.log("something is rotten in the state of denmark");
  }

  // Log the populated object
  console.log(postIDToDelete);
}

// Add event listener to form submit event
delBtn.addEventListener("click", handlePostDeletion);
