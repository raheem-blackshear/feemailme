/*
* Wire together all the different reducers in the application.
* Naming this index.js is a convention enabling us to simply import the reducers directory.
*/
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';

/*
* [Documentation: combineReducers]{@link https://github.com/reactjs/redux/blob/master/docs/api/combineReducers.md}
*
* @param {Object} keys
*   Keys provided to this object represent keys existing inside of state object.
*/
export default combineReducers({
  // auth state is manufactured by authReducer
  auth: authReducer,
  /*
  * Manages form action creators, values, connecting to redux store, etc.
  * [Documentation: redux-form.reducer]{@link https://redux-form.com/7.2.0/docs/api/reducer.md/}
  */
  form: formReducer
});
