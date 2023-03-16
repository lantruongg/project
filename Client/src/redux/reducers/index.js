import { combineReducers } from "redux";
import posts from "./posts.js";
import allPosts from "./allPosts.js";
import modal from "./modal.js";
import departments from "./departments.js";
import categories from "./categories.js";
export default combineReducers({
  posts,
  modal,
  departments,
  categories,
  allPosts,
});
