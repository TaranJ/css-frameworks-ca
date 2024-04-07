import { displayPosts } from "./ui/posts.js";
import { handleNavbar } from "./ui/navigation.js";
import { handleNewestLink, handleTopPostLink } from "./ui/filter.js";

displayPosts();
handleNavbar();
handleTopPostLink();
handleNewestLink();
