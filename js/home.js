import { setLoginListener } from "./api/auth/login.js";
import { setRegisterListener } from "./api/auth/register.js";
import { setCloseButtonListener, setSignupListener } from "./ui/registerform.js";

export async function homePage() {
  setRegisterListener();
  setLoginListener();
  setSignupListener();
  setCloseButtonListener();
}
