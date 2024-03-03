import { load } from "../storage/load.js";
import { profilePic } from "./constants.js";

export async function displayIcon() {
  const profile = load("profile");
  console.log(profile);

  if (profile.name != undefined) {
    profilePic.innerHTML = `<img src="${profile.avatar.url}" class="profile-thumbnail rounded-circle"><ul class="dropdown-menu border-green">
    <li class="dropdown-item">Sign out</li>
  </ul>`;
  } else {
  }
}
