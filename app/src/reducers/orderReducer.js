import { UPDATE_ORDER } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.value;
    default:
      return state;
  }
}
