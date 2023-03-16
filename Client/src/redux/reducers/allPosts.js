import { INIT_STATE } from "../../constant";
import { getAllPosts, getType } from "../actions";

export default function postsReducers(state = INIT_STATE.allPosts, action) {
  switch (action.type) {
    case getType(getAllPosts.getAllPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllPosts.getAllPostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAllPosts.getAllPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
