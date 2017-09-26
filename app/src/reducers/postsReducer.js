import { FETCH_POSTS, DELETE_POST } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return [...action.payload];
    case DELETE_POST:
      return state.filter(post => post.id !== action.value.id);
    default:
      return state;
  }
}
