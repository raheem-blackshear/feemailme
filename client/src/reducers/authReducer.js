/*
* Records whether or not a user is logged in
*/
export default function(state = {}, action) {
  // Log all actions reducer is called with
  console.log(action);

  switch(action.type) {
    default:
      return state;
  }
};
