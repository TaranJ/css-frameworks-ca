import { load } from "../storage/load.js";
import { meta, profileContainer, profilePic } from "./constants.js";

/**
 * Dynamically updates the UI to display the user's profile picture and a dropdown menu.
 * If a profile is loaded and contains a name, this function will insert an HTML string
 * containing the profile's avatar and a dropdown menu with options into the `profilePic` element.
 * This function assumes that a global `profilePic` element exists in the DOM where the profile
 * icon and dropdown menu will be displayed. It uses the `load` function to retrieve the profile
 * information from local storage.
 */
export async function displayIcon() {
  // Attempts to load the profile from local storage
  const profile = load("profile");
  // Checks if the loaded profile has a name property (implicitly checks if profile is not undefined/null)
  if (profile.name != undefined) {
    profilePic.innerHTML = `<img src="${profile.avatar.url}" class="profile-thumbnail rounded-circle"><ul class="dropdown-menu border-green">
    <li><a class="dropdown-item profile-link" href="/profile/index.html">Your profile</a></li>
    <li><a class="dropdown-item sign-out-link" href="/index.html">Sign out</a></li>
  </ul>`;
  }
}

export async function displayProfile() {
  try {
    // Attempts to retrieve the profile from local storage
    const profile = load("profile");
    // Calls a function to update the DOM with the profile information
    createHTMLForProfile(profile);
  } catch (error) {
    console.error("Error displaying profile:", error);
  }
}

/**
 * Generates HTML content to display the user's profile information.
 * Inserts the user's profile picture, name, and optionally bio into the designated profile container element.
 *
 * @param {object} profile - The user's profile data containing name, avatar URL, and optionally bio.
 */
export function createHTMLForProfile(profile) {
  meta.content = `${profile.name}'s profile on Pawfinity. Connect with ${profile.name} and explore their posts and activity. Share your pet stories and join the community today!
`;

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
