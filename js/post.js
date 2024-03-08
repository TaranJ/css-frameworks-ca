import { handlePostDeletion } from "./api/delete.js";
import { showEditSection } from "./ui/edit.js";
import { handleProfileLink, handleSignOut } from "./ui/navigation.js";
import { displayIcon } from "./ui/profileinfo.js";
import { displayPost } from "./ui/singlepost.js";

displayPost();
displayIcon();
handleSignOut();
handleProfileLink();
showEditSection();
