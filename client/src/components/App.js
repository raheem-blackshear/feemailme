import React, { Component } from 'react';
/*
* Helpers for navigating around the DOM
*
* BrowserRouter:
*   - Tells React how to behave.
*   - Expects AT MOST 1 child.
*   - Looks at current URL and changes the set of visible components.
*/
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// Assign all action creators to 'actions'
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';

// TODO implement remaining display Components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>New Survey</h2>;

class App extends Component {

  /*
  * Call Action Creator, which makes AJAX request for current_user.
  * Once Express API resolves request, we automatically dispatch an action.
  * Action is sent to Reducers in Redux Store.
  */
  componentDidMount() {
    this.props.fetchUser();
  }

  /*
  * Display main page body.
  */
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />

          </div>
        </BrowserRouter>
      </div>
    );
  };
};

// Connect (Map State, action creators to wire up)
// The actions passed in here are assigned to the App component as props
export default connect(null, actions)(App);
