import { posts } from "../api/fetch.js";
import { searchField } from "./constants.js";
import { createHTML } from "./posts.js";

// Function to search through posts
export function searchPosts(query) {
  const filteredPosts = posts.filter((post) => {
    // Customize this condition based on your search criteria
    return post.title.toLowerCase().includes(query.toLowerCase());
  });

  // Call createHTML with filtered posts
  createHTML(filteredPosts);
}

// Event listener for input change in search bar
export function attachSearchEventListener() {
  searchField.addEventListener("input", function () {
    const query = this.value.trim();
    searchPosts(query);
  });
}
