/*
* The Dashboard where the user can create a new survey or (TODO) view existing surveys.
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Greeting from './Greeting'
import SurveyList from './surveys/SurveyList';

class Dashboard extends Component {

  /*
  * At this time, this only displays the user greeting.
  * TODO finish writing this
  */
  renderUserContent() {
    // If user is logged in, auth will not be null
    if (this.props.auth) {
      // Render first name
      // FIXME this looks gross
      return <div className='card blue accent-4 white-text'>
          <div className='card-content'>
              <div className='chip blue lighten-2 white-text right'><Greeting name={ this.props.auth.firstName } /></div>
              <p className='flow-text center-align'><h4>Survey Dashboard</h4></p>
            </div>
          </div>
    }
  }

  /*
  * Render the dashboard
  */
  render() {
  return (
    <div>
      { this.renderUserContent() }
      <SurveyList />
      <div className='fixed-action-btn'>
        <Link
          to='/surveys/new/'
          className='btn-floating btn-large waves-effect waves-light blue lighten-2'
          title='Create a new survey'
          >
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </div>
  );
}};

/*
* @param {state} object returned by combineReducers has 1 property: auth
* @returns {Object} Passed to dashboard as props
*/
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
