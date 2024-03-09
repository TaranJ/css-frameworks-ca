import { handlePostDeletion } from "./api/delete.js";
import { delBtn } from "./ui/constants.js";
import { showEditSection } from "./ui/edit.js";
import { handleProfileLink, handleSignOut } from "./ui/navigation.js";
import { displayIcon } from "./ui/profileinfo.js";
import { attachSearchEventListener } from "./ui/search.js";
import { displayPost } from "./ui/singlepost.js";

displayPost();
displayIcon();
handleSignOut();
handleProfileLink();
showEditSection();
attachSearchEventListener();

// Add event listener to form submit event
delBtn.addEventListener("click", handlePostDeletion);
