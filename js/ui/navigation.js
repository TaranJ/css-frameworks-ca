import { displayIcon } from "./profileinfo.js";
import { attachSearchEventListener } from "./search.js";

/**
 * Handles signing out when the "Sign out" link is clicked.
 *
 * @returns {void}
 */
function handleSignOut() {
  const signOutLink = document.querySelector(".sign-out-link");

  // Add a click event listener to the "Sign out" link
  signOutLink.addEventListener("click", function (event) {
    event.preventDefault();
    // Navigate to the URL specified in the link's href attribute
    window.location.href = this.getAttribute("href");
  });
}

/**
 * Handles navigating to the user's profile when the "Your profile" link is clicked.
 *
 * @returns {void}
 */
function handleProfileLink() {
  const profileLink = document.querySelector(".profile-link");
  profileLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = this.getAttribute("href");
  });
}

/**
 * Handles navbar functionality by attaching event listeners and updating UI.
 *
 * @returns {void}
 */
export function handleNavbar() {
  attachSearchEventListener();
  displayIcon();
  handleProfileLink();
  handleSignOut();
}
