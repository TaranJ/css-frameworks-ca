import { closeBtn, registerForm, signUpBtn } from "./constants.js";

// makes register form pop up
export function openRegisterForm(event) {
  registerForm.classList.add("active");
}

// adds listener to sign up button
export function setSignupListener() {
  signUpBtn.addEventListener("click", openRegisterForm);
}

// closing the register form and reloading page
function closeModal() {
  location.reload();
  window.scrollTo(0, 0);
}

export function setCloseButtonListener() {
  closeBtn.addEventListener("click", closeModal);
}
