import { getPosts } from "../api/fetch.js";
import { load } from "../storage/load.js";
import { newestPosts, topPosts } from "./constants.js";
import { createHTMLForProfilePosts, createHTMLPosts } from "./posts.js";
import { clearPreviousPosts } from "./search.js";

export async function sortByReactions(posts) {
  try {
    const result = await getPosts();
    const posts = result.data;

    // Sort the posts array based on the number of reactions in descending order
    const sortedPosts = posts.sort((a, b) => b._count.reactions - a._count.reactions);
    console.log(sortedPosts);

    // Clear previous posts from the DOM
    clearPreviousPosts();

    // Display filtered posts
    createHTMLPosts(sortedPosts);

    return sortedPosts;
  } catch (error) {
    console.error("Error searching posts:", error);
  }
}

export function handleTopPostLink() {
  // Add a click event listener to the "Sign out" link
  topPosts.addEventListener("click", function (event) {
    event.preventDefault();
    // Navigate to the URL specified in the link's href attribute
    sortByReactions();
  });
}

export function handleNewestLink() {
  // Add a click event listener to the "Sign out" link
  newestPosts.addEventListener("click", function (event) {
    event.preventDefault();
    // Navigate to the URL specified in the link's href attribute
    window.location.reload();
  });
}

export async function filterByProfile(profileName) {
  try {
    const result = await getPosts();
    const posts = result.data;
    console.log(posts);

    // Load profile information
    const profile = load("profile");
    if (!profile) {
      console.error("Profile information not found.");
      return;
    }

    // Filter posts based on the profile name
    const profilePosts = posts.filter((post) => post.author.name.toLowerCase().includes(profile.name.toLowerCase()));
    console.log(profilePosts);
    createHTMLForProfilePosts(profilePosts);
    return profilePosts;
  } catch (error) {
    console.error("Error searching posts by profile name:", error);
  }
}
