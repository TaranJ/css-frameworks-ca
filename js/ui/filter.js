import { getPosts } from "../api/fetch.js";
import { load } from "../storage/load.js";
import { newestPosts, topPosts } from "./constants.js";
import { createHTMLForProfilePosts, createHTMLPosts, displayPosts } from "./posts.js";
import { clearPreviousPosts } from "./search.js";

// Fetches posts and sorts them by the number of reactions in descending order.
export async function sortByReactions() {
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
    throw error;
  }
}

export function handleTopPostLink() {
  // Add a click event listener to the "Top Posts" link
  topPosts.addEventListener("click", function (event) {
    //     prevents the default link behavior and calls the `sortByReactions` function to sort and display posts by the number of reactions
    event.preventDefault();
    sortByReactions();
  });
}

export function handleNewestLink() {
  // Add a click event listener to the "newest" link
  newestPosts.addEventListener("click", function (event) {
    event.preventDefault();
    const locationURL = new URL(window.location.href);
    locationURL.searchParams.delete("query"); // Remove the 'query' parameter
    window.location.href = locationURL.toString(); // Update the URL
    displayPosts(); // the posts are fetched from the API again and by default they display with the newest first
  });
}

/**
 * Filters posts by a specific profile name and displays them.
 * This function fetches all posts, then filters them based on the given profile name,
 * which is matched against the author names of the posts. It assumes the current user's
 * profile name is to be used for filtering. The filtered posts are then displayed using
 * a dedicated function.
 *
 * Note: This function retrieves the current user's profile from local storage to
 * determine the profile name for filtering. If no profile is found in local storage,
 * it logs an error and exits without filtering.
 */
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
