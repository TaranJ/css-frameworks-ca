import { displayIcon } from "./ui/profileinfo.js";
import { handleProfileLink, handleSignOut } from "./ui/navigation.js";
import { setUploadListener } from "./api/createpost.js";
import { attachSearchEventListener } from "./ui/search.js";

displayIcon();
handleSignOut();
handleProfileLink();
setUploadListener();
attachSearchEventListener();
