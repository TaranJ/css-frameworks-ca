import { save } from "../../storage/save.js";
import { errLogin } from "../../ui/constants.js";
import { APIBase, loginURL } from "../constants.js";
import { getPosts } from "../fetch.js";

export async function onLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  await login(email, password);

  const posts = await getPosts();
  console.log(posts);
}

export async function login(email, password) {
  const response = await fetch(APIBase + loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    save("profile", profile);
    window.location.href = "/feed/index.html";
    return profile;
  } else if (response.status === 401 || response.status === 400) {
    errLogin.classList.remove("d-none");
    throw new Error("Invalid email or password. Please try again.");
  } else {
    throw new Error("Could not login the account");
  }
}

export function setLoginListener() {
  document.getElementById("loginForm").addEventListener("submit", onLogin);
}
