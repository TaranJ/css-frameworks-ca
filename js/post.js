import { handlePostDeletion } from "./api/delete.js";
import { delBtn } from "./ui/constants.js";
import { showEditSection } from "./ui/edit.js";
import { handleNavbar } from "./ui/navigation.js";
import { displayPost } from "./ui/singlepost.js";

displayPost();
handleNavbar();
showEditSection();

// Add event listener to form submit event
delBtn.addEventListener("click", handlePostDeletion);
