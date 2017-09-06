import * as Api from '../utils/Api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const receivePosts = payload => ({
  type: FETCH_POSTS,
  payload
});

export const fetchPosts = () => dispatch => (
  Api
    .getPosts()
    .then(payload => dispatch(receivePosts(payload)))
);

export const receiveCategories = payload => ({
  type: FETCH_CATEGORIES,
  payload
});

export const fetchCategories = () => dispatch => (
  Api
    .getCategories()
    .then(payload => dispatch(receiveCategories(payload)))
);