import { getSinglePost } from "../api/fetch.js";
import { meta } from "./constants.js";

const postContainer = document.querySelector(".post-container");

/**
 * Displays a single post on the page.
 * This function retrieves a single post using the `getSinglePost` function,
 * then creates and inserts HTML content representing the post into the DOM using the `createHTMLPost` function.
 *
 * @async
 * @throws {Error} If there is an issue retrieving the post or updating the DOM.
 */
export async function displayPost() {
  try {
    const result = await getSinglePost();
    const post = result.data;
    console.log(post);

    createHTMLPost(post);
  } catch (error) {
    console.error("Failed to display post:", error);
    throw error;
  }
}

/**
 * Generates HTML content to display a single post on the page.
 * Inserts the post's title, media, author name, creation date, body, and interaction icons into the designated post container element.
 */
export function createHTMLPost(post) {
  const newDate = new Date(post.created);
  const date = newDate.toLocaleDateString("en-GB");

  meta.content = ` Check out ${post.author.name}'s latest post on Pawfinity: ${post.title}. Connect, share, and celebrate with fellow pet lovers. The perfect space for wagging tails and endless smiles. Join the fun now!`;

  postContainer.innerHTML += `<h1 class="p-2 p-sm-0 pt-sm-5 pb-sm-3 h3 text-uppercase">${post.title}</h1>

<img src="${post.media.url}" alt="${post.media.alt}" class="w-100 p-0 post-page-img" />

<div class="d-flex justify-content-between p-2 pt-2 pb-5 p-sm-0 pt-sm-2 pb-sm-3">
    <p class="col-10 col-lg-9 col-xl-10 text-black mb-0"> Posted by ${post.author.name}, ${date} </p>
    <i class="fa-regular fa-heart"></i>
</div>
<p>${post.body}</p>
  `;
}
