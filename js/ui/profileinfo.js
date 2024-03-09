import { load } from "../storage/load.js";
import { profileContainer, profilePic } from "./constants.js";

export async function displayIcon() {
  const profile = load("profile");

  if (profile.name != undefined) {
    profilePic.innerHTML = `<img src="${profile.avatar.url}" class="profile-thumbnail rounded-circle"><ul class="dropdown-menu border-green">
    <li><a class="dropdown-item profile-link" href="/profile/index.html">Your profile</a></li>
    <li><a class="dropdown-item sign-out-link" href="/index.html">Sign out</a></li>
  </ul>`;
  }
}

export async function displayProfile() {
  try {
    const profile = load("profile");
    console.log(profile);
    createHTMLForProfile(profile);
  } catch (error) {
    console.error("Error displaying profile:", error);
  }
}

export function createHTMLForProfile(profile) {
  if (profile.bio) {
    profileContainer.innerHTML += `<img src="${profile.avatar.url}" alt="profile picture" class="profile-main rounded-circle" />
  <h1 class="mb-0 mt-sm-3">${profile.name}</h1>
  <p class="text-lowercase p-0 text-light">${profile.bio}</p>
  `;
  } else {
    profileContainer.innerHTML += `<img src="${profile.avatar.url}" alt="profile picture" class="profile-main rounded-circle" />
  <h1 class="mb-0 mt-sm-3">${profile.name}</h1>
  `;
  }
}

/* <section class="container d-flex flex-column align-items-center pt-3 pt-sm-5">
        <img src="/images/hamster-5964167_1280.jpg" alt="profile picture" class="profile-main rounded-circle w-100" />
        <h1 class="mb-0 mt-sm-3">hammy_boi</h1>
        <p class="text-lowercase p-0 text-light">Member since 23. jan 2023</p>
      </section> */

// function to fetch information about current profile from API
// export async function getProfile() {
//   const response = await fetch(APIBase + "/social/profiles/hammy_boi", {
//     headers: {
//       Authorization: `Bearer ${load("token")}`,
//       "X-Noroff-API-Key": APIKey,
//     },
//   });

//   const profile = await response.json();
//   console.log(profile);
// }
// getProfile();
