import { displayPosts } from "./ui/posts.js";
import { displayIcon } from "./ui/profileinfo.js";
import { handleProfileLink, handleSignOut } from "./ui/navigation.js";

displayPosts();
displayIcon();
handleSignOut();
handleProfileLink();
