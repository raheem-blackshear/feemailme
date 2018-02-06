import { FETCH_SURVEYS } from '../actions/types';

/*
* Get the list of surveys created by the logged-in user.
* @returns {state}
*     state = initially an empty array; changes to array of surveys once request is completed.
*/
export default function(state = [], action) {

  switch(action.type) {
    // Payload is the array of surveys
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
};
