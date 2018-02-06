/*
* This contains all Action Creator code.
*
* Redux Thunk inspects any values returned by an actioncreator and allows
* for direct access to Dispatch Function.
*/
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types.js';

/*
* Action Creator to make AJAX request to Express for currently logged-in user.
*/
export const fetchUser = () =>
  // Whenever our actioncreator gets called, it instantly returns this function:
  async (dispatch) => {
    // Don't dispatch any actions until this has been executed
    // Make request to back-end server, returns a promise
    const res = await axios.get('/api/current_user');

    // Dispatch an action sent directly to different reducers
    dispatch({
      type: FETCH_USER,
      // Return the user data returned by Express
      payload: res.data
    });
  };

/*
* Handle token from Stripe transaction.
*/
export const handleToken = (token) =>
  async (dispatch) => {
    const res = await axios.post('/api/stripe', token);

    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  };

/*
* Action creator that submits the final survey to be mailed
* @param {Object} values The user's form entries
* @param {Object} history Provided by react-router, used to redirect after POST
* {@link SurveyFormReview}
*/
export const submitSurvey = (values, history) =>
  async (dispatch) => {
    // POST user's form entries to back-end API
    const res = await axios.post('/api/surveys', values);

    // Route user away from survey after successful send
    history.push('/surveys');

    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  };

/*
* Action creator that fetches the list of surveys created by the logged-in user.
* {@link surveyRoutes}
* {@link surveysReducer}
*/
export const fetchSurveys = () =>
  async (dispatch) => {
    const res = await axios.get('/api/surveys');
    // Array of surveys created by user (sans recipient list) returned by MongoDB
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  };
