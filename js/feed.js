import { displayPosts } from "./ui/posts.js";
import { displayIcon } from "./ui/profileinfo.js";
import { handleProfileLink, handleSignOut } from "./ui/navigation.js";
import { attachSearchEventListener } from "./ui/search.js";

displayPosts();
displayIcon();
handleSignOut();
handleProfileLink();
attachSearchEventListener();
