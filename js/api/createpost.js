import { load } from "../storage/load.js";
import { uploadErr } from "../ui/constants.js";
import { APIBase, APIKey, postsURL } from "./constants.js";

/**
 * Creates a new post by sending a POST request to the server.
 * @async
 * @param {object} postData - The data for the new post.
 * @returns {Promise<object>} A Promise that resolves with the response data
 * from the server upon successful creation of the post.
 * @throws {Error} If the request fails or an error occurs during processing.
 */
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
    return responseData;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
}

// Usage example:
export const newPostData = {
  title: "",
  media: {
    url: "",
  },
  body: "",
  tags: [""],
};

// Function to handle form submission
export async function handlePostCreation(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieves values from input elements
  const postTitle = document.getElementById("title").value;
  const mediaUrl = document.getElementById("new-image").value;
  const postDescription = document.getElementById("description").value;
  // Retrieves the value of the tags input element and splits it into an array of tags
  const postTags = document
    .getElementById("tags")
    .value.split(",")
    .map((tag) => tag.trim());

  // Populate newPostData object with form data
  newPostData.title = postTitle;
  newPostData.media.url = mediaUrl;
  newPostData.body = postDescription;
  newPostData.tags = postTags;

  try {
    await createPost(newPostData);
    window.location.href = "/feed/index.html";
  } catch (error) {
    uploadErr.classList.remove("d-none");
    console.error(error);
  }
}

// Adds an event listener to the form with the ID "createPost" to handle post creation.
export function setUploadListener() {
  document.getElementById("createPost").addEventListener("submit", handlePostCreation);
}
