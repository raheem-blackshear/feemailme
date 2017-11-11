import axios from 'axios';
import { FETCH_USER } from './types.js';
// All actioncreator code goes in here

// Redux Thunk allows for direct access to Dispatch Function by inspecting any values returned by an actioncreator
export const fetchUser = () => {
  // Whenever our actioncreator gets called, it instantly returns this function:
  return function(dispatch) {
    // Don't dispatch any actions until this has been executed
    // Make request to back-end server
    axios
      .get('/api/current_user')
      // Dispatch an action sent directly to different reducers
      .then(
        (res) => dispatch({
          type: FETCH_USER,
          payload: res
        }
    ));
  }
};
