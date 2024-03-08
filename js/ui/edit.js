import { getSinglePost } from "../api/fetch.js";
import { handlePostUpdate } from "../api/update.js";
import { load } from "../storage/load.js";
import { editBtn, updateForm } from "./constants.js";

const editContainer = document.getElementById("edit-container");

export async function showEditSection() {
  const profile = load("profile");
  getSinglePost();
  const result = await getSinglePost();
  const post = result.data;

  if (profile.name == post.author.name) {
    editContainer.classList.remove("d-none");
  }
}

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

editBtn.addEventListener("click", openEditor);
