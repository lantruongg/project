import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
//post
export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
});
export const getAllPosts = createActions({
  getAllPostsRequest: undefined,
  getAllPostsSuccess: (payload) => payload,
  getAllPostsFailure: (err) => err,
});
export const createPosts = createActions({
  createPostsRequest: (payload) => payload,
  createPostsSuccess: (payload) => payload,
  createPostsFailure: (err) => err,
});
export const updatePosts = createActions({
  updatePostsRequest: (payload) => payload,
  updatePostsSuccess: (payload) => payload,
  updatePostsFailure: (err) => err,
});
export const updatePostAccept = createActions({
  updatePostAcceptRequest: (payload) => payload,
  updatePostAcceptSuccess: (payload) => payload,
  updatePostAcceptFailure: (err) => err,
});
export const updatePostReject = createActions({
  updatePostRejectRequest: (payload) => payload,
  updatePostRejectSuccess: (payload) => payload,
  updatePostRejectFailure: (err) => err,
});
export const deletePosts = createActions({
  deletePostsRequest: (payload) => payload,
  deletePostsSuccess: (payload) => payload,
  deletePostsFailure: (err) => err,
});
export const deletePostByAdmin = createActions({
  deletePostRequestByAdmin: (payload) => payload,
  deletePostSuccessByAdmin: (payload) => payload,
  deletePostFailureByAdmin: (err) => err,
});
//department
export const getDepartments = createActions({
  getDepartmentsRequest: undefined,
  getDepartmentsSuccess: (payload) => payload,
  getDepartmentsFailure: (err) => err,
});
export const createDepartments = createActions({
  createDepartmentsRequest: (payload) => payload,
  createDepartmentsSuccess: (payload) => payload,
  createDepartmentsFailure: (err) => err,
});
export const updateDepartments = createActions({
  updateDepartmentsRequest: (payload) => payload,
  updateDepartmentsSuccess: (payload) => payload,
  updateDepartmentsFailure: (err) => err,
});
export const deleteDepartments = createActions({
  deleteDepartmentsRequest: (payload) => payload,
  deleteDepartmentsSuccess: (payload) => payload,
  deleteDepartmentsFailure: (err) => err,
});
//category
export const getCategories = createActions({
  getCategoriesRequest: undefined,
  getCategoriesSuccess: (payload) => payload,
  getCategoriesFailure: (err) => err,
});
export const createCategories = createActions({
  createCategoriesRequest: (payload) => payload,
  createCategoriesSuccess: (payload) => payload,
  createCategoriesFailure: (err) => err,
});
export const updateCategories = createActions({
  updateCategoriesRequest: (payload) => payload,
  updateCategoriesSuccess: (payload) => payload,
  updateCategoriesFailure: (err) => err,
});
export const deleteCategories = createActions({
  deleteCategoriesRequest: (payload) => payload,
  deleteCategoriesSuccess: (payload) => payload,
  deleteCategoriesFailure: (err) => err,
});
export const showModal = createAction("SHOW_CREATE_POST_MODEL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");
