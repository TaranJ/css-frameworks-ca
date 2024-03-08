import { displayPosts } from "./ui/posts.js";
import { displayIcon } from "./ui/profileinfo.js";
import { handleProfileLink, handleSignOut } from "./ui/navigation.js";
import { newProfile, updateProfile } from "./api/update.js";

displayPosts();
displayIcon();
handleSignOut();
handleProfileLink();
