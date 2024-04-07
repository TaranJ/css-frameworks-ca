import { getPosts } from "../api/fetch.js";
import { searchField } from "./constants.js";
import { createHTMLPosts, postsContainer } from "./posts.js";

/**
 * This function retrieves all posts, filters them based on the search query (matching title, body, username, and tags)
 *
 * @param {string} query - The search query to filter posts.
 * @throws {Error} When there is an issue retrieving posts or updating the DOM.
 */
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

    // Clear previous posts from the DOM
    clearPreviousPosts();

    // Display filtered posts
    createHTMLPosts(filteredPosts);
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
}

// Clear the container by setting its innerHTML to an empty string
export function clearPreviousPosts() {
  postsContainer.innerHTML = "";
}

/**
 * Attaches event listeners to the search field based on the current page.
 * If the current page is the feed index page, it listens for input changes in the search field
 * and triggers a search for posts based on the entered query. If the current page is not the feed index page,
 * it listens for keydown events and if the Enter key is pressed, it redirects to the feed index page
 * with the search query appended to the URL.
 */
export function attachSearchEventListener() {
  if (window.location.pathname === "/feed/index.html") {
    searchField.addEventListener("input", function () {
      const query = this.value.trim();
      searchPosts(query);
      console.log("Search executed for:", query);
    });
  } else {
    searchField.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const query = this.value.trim();
        window.location.href = `/feed/index.html?query=${encodeURIComponent(query)}`;
      }
    });
  }
}
