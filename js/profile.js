import { displayIcon, displayProfile } from "./ui/profileinfo.js";
import { handleSignOut } from "./ui/navigation.js";
import { filterByProfile } from "./ui/filter.js";
import { attachSearchEventListener } from "./ui/search.js";

displayIcon();
handleSignOut();
displayProfile();
filterByProfile();
attachSearchEventListener();
