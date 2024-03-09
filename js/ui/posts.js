import { getPosts } from "../api/fetch.js";
import { profilePostsContainer } from "./constants.js";
import { clearPreviousPosts, searchPosts } from "./search.js";

export const postsContainer = document.querySelector(".posts-container");

/**
 * Fetches and displays posts. It also checks for a search query in the URL parameters,
 * and if found, filters the displayed posts by this query.
 * @async
 * @returns {Promise<void>} A Promise that resolves once posts have been fetched and displayed,
 * or filtered and displayed based on a search query.
 */
export async function displayPosts() {
  try {
    const result = await getPosts();
    const posts = result.data;
    console.log(posts);

    createHTMLPosts(posts);

    // Retrieve the search query from the URL parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get("query");

    // If a search query exists, filter the posts
    if (query) {
      clearPreviousPosts();
      searchPosts(query);
    }
  } catch (error) {
    console.error("Error displaying posts:", error);
  }
}

/**
 * Generates and appends HTML content for each post in the provided array.
 * This function iterates through each post, formats the creation date, checks for media presence,
 * and constructs an HTML string that is then appended to the `postsContainer` element.
 * @param {Array} posts - An array of post objects to be displayed. Each post object should contain
 * necessary information such as the author's name, avatar URL, post creation date, and optionally media
 * with a URL and alt text.
 */
export function createHTMLPosts(posts) {
  posts.forEach((posts) => {
    const newDate = new Date(posts.created);
    const date = newDate.toLocaleDateString("en-GB");
    if (posts.media) {
      postsContainer.innerHTML += `<a href="post.html?id=${posts.id}" class="post text-decoration-none mb-sm-4">
    <div class="row mb-2 w-100">
      <div class="col-2 col-lg-3 col-xl-2 align-self-center">
        <div class="container ps-2">
          <img src="${posts.author.avatar.url}" alt="profile picture" class="profile-thumbnail rounded-circle" />
        </div>
      </div>
      <div class="col-10 col-lg-9 col-xl-10 fs-7">
        <div class="container p-0 fw-bold text-black"> ${posts.author.name} </div>
        <p class="text-light mb-0">${date}</p>
      </div>
    </div>
    <img src="${posts.media.url}" alt="${posts.media.alt}" class="post-thumbnail" />
    <div class="d-flex justify-content-between p-2 pb-5 pb-sm-3">
      <i class="fa-solid fa-ellipsis"></i>
      <i class="fa-regular fa-heart"></i>
    </div>
  </a>`;
    }
  });
}

// Dynamically generates and appends HTML for each post in the provided array to the `profilePostsContainer` on the profile page.
export function createHTMLForProfilePosts(posts) {
  posts.forEach((posts) => {
    const newDate = new Date(posts.created);
    const date = newDate.toLocaleDateString("en-GB");
    if (posts.media) {
      profilePostsContainer.innerHTML += `<a href="/feed/post.html?id=${posts.id}" class="post text-decoration-none mb-sm-4">
    <div class="row mb-2 w-100">
      <div class="col-2 col-lg-3 col-xl-2 align-self-center">
        <div class="container ps-2">
          <img src="${posts.author.avatar.url}" alt="profile picture" class="profile-thumbnail rounded-circle" />
        </div>
      </div>
      <div class="col-10 col-lg-9 col-xl-10 fs-7">
        <div class="container p-0 fw-bold text-black"> ${posts.author.name} </div>
        <p class="text-light mb-0">${date}</p>
      </div>
    </div>
    <img src="${posts.media.url}" alt="${posts.media.alt}" class="post-thumbnail" />
    <div class="d-flex justify-content-between p-2 pb-5 pb-sm-3">
      <i class="fa-solid fa-ellipsis"></i>
      <i class="fa-regular fa-heart"></i>
    </div>
  </a>`;
    }
  });
}
