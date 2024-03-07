import { load } from "../storage/load.js";
import { profilePic } from "./constants.js";

export async function displayIcon() {
  const profile = load("profile");
  console.log(profile);

  if (profile.name != undefined) {
    profilePic.innerHTML = `<img src="${profile.avatar.url}" class="profile-thumbnail rounded-circle"><ul class="dropdown-menu border-green">
    <li><a class="dropdown-item profile-link" href="/profile/index.html">Your profile</a></li>
    <li><a class="dropdown-item sign-out-link" href="/index.html">Sign out</a></li>
  </ul>`;
  } else {
  }
}

// function to fetch information about hammy_boi from API
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
