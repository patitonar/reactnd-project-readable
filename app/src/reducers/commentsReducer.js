import { FETCH_COMMENTS, UPDATE_COMMENT } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        [action.payload.postId]: action.payload.payload
      };
    case UPDATE_COMMENT:
      console.log('state', state[action.payload.parentId]);
      return {
        ...state,
        [action.payload.parentId]: state[action.payload.parentId].map(
          comment =>
            action.payload.id === comment.id ? action.payload : comment
        )
      };
    default:
      return state;
  }
}
