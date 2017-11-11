import axios from 'axios';
import { FETCH_USER } from './types.js';
// All actioncreator code goes in here

// Redux Thunk allows for direct access to Dispatch Function by inspecting any values returned by an actioncreator
export const fetchUser = () =>
  // Whenever our actioncreator gets called, it instantly returns this function:
  async (dispatch) => {
    // Don't dispatch any actions until this has been executed
    // Make request to back-end server, returns a promise
    const res = await axios.get('/api/current_user');
    // Dispatch an action sent directly to different reducers
    dispatch({
      type: FETCH_USER,
      // Return the user data
      payload: res.data
    });
  }
