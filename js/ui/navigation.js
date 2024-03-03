export function handleSignOut() {
  const signOutLink = document.querySelector(".sign-out-link");

  // Add a click event listener to the "Sign out" link
  signOutLink.addEventListener("click", function (event) {
    event.preventDefault();
    // Navigate to the URL specified in the link's href attribute
    window.location.href = this.getAttribute("href");
  });
}

export function handleProfileLink() {
  const signOutLink = document.querySelector(".profile-link");

  // Add a click event listener to the "Sign out" link
  signOutLink.addEventListener("click", function (event) {
    event.preventDefault();
    // Navigate to the URL specified in the link's href attribute
    window.location.href = this.getAttribute("href");
  });
}
