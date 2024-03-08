import { getPosts } from "../api/fetch.js";
import { searchField } from "./constants.js";
import { createHTMLPosts, postsContainer } from "./posts.js";

// Function to search through posts
export async function searchPosts(query) {
  try {
    const result = await getPosts();
    const posts = result.data;

    // Filter posts based on the search query
    const filteredPosts = posts.filter((post) => {
      if (query) {
        const titleMatch = post.title && post.title.toLowerCase().includes(query.toLowerCase());
        const bodyMatch = post.body && post.body.toLowerCase().includes(query.toLowerCase());
        const nameMatch = post.author.name && post.author.name.toLowerCase().includes(query.toLowerCase());
        const tagsMatch = post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
        return titleMatch || bodyMatch || nameMatch || tagsMatch;
      }
      return false;
    });

    console.log(filteredPosts);
    // Clear previous posts from the DOM
    clearPreviousPosts();

    // Display filtered posts
    createHTMLPosts(filteredPosts);
  } catch (error) {
    console.error("Error searching posts:", error);
  }
}

function clearPreviousPosts() {
  // Clear the container by setting its innerHTML to an empty string
  postsContainer.innerHTML = "";
}

// Event listener for input change in search bar
export function attachSearchEventListener() {
  searchField.addEventListener("input", function () {
    const query = this.value.trim();
    searchPosts(query);
    console.log("button works");
  });
}
