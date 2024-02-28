import { APIBase, registerURL } from "../constants.js";
import { getPosts } from "../fetch.js";

// Function to handle register form submission
export async function register(name, email, password) {
  const response = await fetch(APIBase + registerURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error("could not register the account");
}

export async function onRegister(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  await register(name, email, password);
  console.log("hi");

  const posts = await getPosts();
  console.log(posts);
}

export function setRegisterListener() {
  document.getElementById("registerForm").addEventListener("submit", onRegister);
}
