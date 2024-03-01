import { registerOK, errSignup } from "../../ui/constants.js";
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
    document.getElementById("registerForm").reset();
    registerOK.classList.remove("d-none");
    errSignup.classList.add("d-none");
    return await response.json();
  } else if (response.status === 400) {
    errSignup.classList.remove("d-none");
    throw new Error("Only stud.noroff.no emails are allowed to register");
  } else {
    throw new Error("could not register the account");
  }
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
