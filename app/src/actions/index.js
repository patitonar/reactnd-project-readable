import * as Api from '../utils/Api';

export const FETCH_POSTS = 'FETCH_POSTS';

export const receivePosts = payload => ({
  type: FETCH_POSTS,
  payload
});

export const fetchPosts = () => dispatch => (
  Api
    .getPosts()
    .then(payload => dispatch(receivePosts(payload)))
);