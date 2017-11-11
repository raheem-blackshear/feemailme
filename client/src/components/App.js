import React, { Component } from 'react';
// Helpers that allow you to navigate around the DOM
// BrowserRouter tells react how to behave; looks at current URL and changes the set of visible components. It expects AT MOST 1 child
// Route is a react component for setting up rules between a route and a set of visible components
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// Assign all action creators to 'actions'
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>New Survey</h2>;


class App extends Component {
  componentDidMount() {
    // Call actioncreator, which makes AJAX request; once Express API resolves request, we automatically dispatch an action. Action is sent to Reducers in Redux Store.
    this.props.fetchUser();
  }

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

}

// Connect (Map State, action creators to wire up)
// The actions passed in here are assigned to the App component as props
export default connect(null, actions)(App);
