import { load } from "../storage/load.js";
import { postForm } from "../ui/constants.js";
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
  title: "hammy",
  media: {
    url: "https://facts.net/wp-content/uploads/2021/04/hamster-in-a-basket.jpg",
  },
  body: "",
  tags: [""],
};

// createPost(newPostData);

// Function to handle form submission
export async function handlePostCreation(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const postTitle = document.getElementById("title").value;
  const mediaUrl = document.getElementById("new-image").value;
  const postDescription = document.getElementById("description").value;
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
  } catch (error) {}

  // Log the populated newPostData object
  console.log(newPostData);
}

// Add event listener to form submit event
postForm.addEventListener("submit", handlePostCreation);
