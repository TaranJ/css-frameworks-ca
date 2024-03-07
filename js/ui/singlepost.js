import { getSinglePost } from "../api/fetch.js";

const postContainer = document.querySelector(".post-container");

export async function displayPost() {
  try {
    const result = await getSinglePost();
    const post = result.data;
    console.log(post);

    createHTMLPost(post);
  } catch (error) {
    console.error("Failed to display post:", error);
  }
}

export function createHTMLPost(post) {
  const newDate = new Date(post.created);
  const date = newDate.toLocaleDateString("en-GB");

  postContainer.innerHTML += `<h1 class="p-2 p-sm-0 pt-sm-5 pb-sm-3 h3 text-uppercase">${post.title}</h1>

<img src="${post.media.url}" alt="${post.media.alt}" class="w-100 p-0" />

<div class="d-flex justify-content-between p-2 pt-2 pb-5 p-sm-0 pt-sm-2 pb-sm-3">
    <p class="col-10 col-lg-9 col-xl-10 text-black mb-0"> Posted by ${post.author.name}, ${date} </p>
    <i class="fa-regular fa-heart"></i>
</div>
<p>${post.body}</p>
  `;
}
