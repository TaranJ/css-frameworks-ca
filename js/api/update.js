import { load } from "../storage/load.js";
import { uploadErr } from "../ui/constants.js";
import { APIBase, APIKey, postsURL } from "./constants.js";
import { newPostData } from "./createpost.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// function to test updating profile info. this is currently not used
export async function updateProfile(postData) {
  try {
    const response = await fetch(APIBase + "/social/profiles/silver", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const responseData = await response.json();
    console.log("Profile updated successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
}

// example of data to pass into updateProfile
export const newProfile = {
  avatar: {
    url: "https://images.unsplash.com/photo-1532022160153-7735cd049992?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

export async function updatePost(postData) {
  try {
    const response = await fetch(APIBase + postsURL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const responseData = await response.json();
    console.log("Post updated successfully:", responseData);
    return responseData; // Optionally, return the response data
  } catch (error) {
    console.error("Error updating post:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export async function handlePostUpdate(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const postTitle = document.getElementById("update-title").value;
  const mediaUrl = document.getElementById("update-image").value;
  const postDescription = document.getElementById("update-description").value;
  const postTags = document
    .getElementById("update-tags")
    .value.split(",")
    .map((tag) => tag.trim());

  // Populate newPostData object with form data
  newPostData.title = postTitle;
  newPostData.media.url = mediaUrl;
  newPostData.body = postDescription;
  newPostData.tags = postTags;

  try {
    await updatePost(newPostData);
    // Reload the current page
    window.location.reload();
  } catch (error) {
    uploadErr.classList.remove("d-none");
    console.error(error);
  }
}
