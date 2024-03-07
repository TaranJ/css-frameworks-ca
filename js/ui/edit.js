import { getSinglePost } from "../api/fetch.js";
import { load } from "../storage/load.js";

const editContainer = document.getElementById("edit-container");

export async function showEditSection() {
  const profile = load("profile");
  getSinglePost();
  const result = await getSinglePost();
  const post = result.data;

  if (profile.name == post.author.name) {
    editContainer.classList.remove("d-none");
  } else {
    console.log("something is rotten in the state of denmark");
  }
}
