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
