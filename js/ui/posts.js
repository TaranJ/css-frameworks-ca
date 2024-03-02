import { getPosts } from "../api/fetch.js";

const postsContainer = document.querySelector(".posts-container");

export async function displayPosts() {
  try {
    const result = await getPosts();
    const posts = result.data;
    console.log(posts);

    createHTML(posts);
  } catch {}
}

function createHTML(posts) {
  console.log(posts.created);

  posts.forEach((posts) => {
    const newDate = new Date(posts.created);
    const date = newDate.toLocaleDateString("en-GB");
    if (posts.media) {
      postsContainer.innerHTML += `<div class="post mb-sm-4">
    <div class="row mb-2 w-100">
      <div class="col-2 col-lg-3 col-xl-2 align-self-center">
        <a href="../profile/index.html" class="container ps-2">
          <img src="${posts.author.avatar.url}" alt="profile picture" class="profile-thumbnail rounded-circle" />
        </a>
      </div>
      <div class="col-10 col-lg-9 col-xl-10 fs-7">
        <a href="../profile/index.html" class="container p-0 fw-bold text-decoration-none text-black"> ${posts.author.name} ${posts.id} </a>
        <p class="text-light mb-0">${date}</p>
      </div>
    </div>
    <img src="${posts.media.url}" alt="${posts.media.alt}" class="post-thumbnail" />
    <div class="d-flex justify-content-between p-2 pb-5 pb-sm-3">
      <i class="fa-solid fa-ellipsis"></i>
      <i class="fa-regular fa-heart"></i>
    </div>
  </div>`;
    }
  });
}
