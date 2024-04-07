import { getSinglePost } from "../api/fetch.js";
import { handlePostUpdate } from "../api/update.js";
import { load } from "../storage/load.js";
import { editBtn, updateForm } from "./constants.js";

const editContainer = document.getElementById("edit-container");

/**
 * Checks if the current user is the author of the post and shows the edit section accordingly.
 * Retrieves the user profile and the single post data.
 * Compares the author of the post with the current user.
 * If the current user is the author, displays the edit section.
 * @async
 * @returns {Promise<void>} A Promise that resolves after showing the edit section.
 */
export async function showEditSection() {
  const profile = load("profile");
  getSinglePost();
  const result = await getSinglePost();
  const post = result.data;

  if (profile.name == post.author.name) {
    editContainer.classList.remove("d-none");
  }
}

/**
 * Populates the editor with data from a single post for updating.
 * Retrieves data of a single post and fills the editor form fields with that data.
 */
async function populateEditor() {
  try {
    const results = await getSinglePost();
    const postData = results.data;
    const { title, media, body, tags } = postData;

    // Set form field values with fetched data
    document.getElementById("update-title").value = title;
    document.getElementById("update-image").value = media.url;
    document.getElementById("update-description").value = body;
    document.getElementById("update-tags").value = tags.join(", ");
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

function openEditor() {
  updateForm.classList.remove("d-none");
  populateEditor();

  // Add event listener to the updateForm once it's revealed
  updateForm.addEventListener("submit", handlePostUpdate);
}

// Add event listener to the edit button to open the editor
editBtn.addEventListener("click", openEditor);