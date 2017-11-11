// Naming this index.js is a convention enabling us to simply import the reducers directory

import { combineReducers } from 'redux';
import authReducer from './authReducer';


/*
* [Documentation: combineReducers]{@link https://github.com/reactjs/redux/blob/master/docs/api/combineReducers.md}
*
* @param {Object} keys
*   Keys provided to this object represent keys existing inside of state object.
*/
export default combineReducers({
  // auth state is manufactured by authReducer
  auth: authReducer
});
