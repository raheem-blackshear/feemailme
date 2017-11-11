import { FETCH_USER } from '../actions/types.js';

/*
* Records whether or not a user is logged in
* @returns {state}
*     state = (logged in) ? User Model : false
*     null if state is unknown
*/
export default function(state = null, action) {

  switch(action.type) {
    // Payload is empty string when user isn't logged in, statement is treated as falsy
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
