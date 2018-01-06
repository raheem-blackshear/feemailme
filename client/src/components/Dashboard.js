/*
* The Dashboard where the user can create a new survey or (TODO) view existing surveys.
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Greeting from './Greeting'
import { connect } from 'react-redux';

class Dashboard extends Component {

  /*
  * At this time, this only displays the user greeting.
  * TODO finish writing this
  */
  renderUserContent() {
    // If user is logged in, auth will not be null
    if (this.props.auth) {
      // Render first name
      return <Greeting name={ this.props.auth.firstName } />
    }
  }

  /*
  * Render the dashboard
  */
  render() {
  return (
    <div>
      <h3>Dashboard</h3>
      { this.renderUserContent() }
      <p>Click the <em>add</em> button in the bottom right to create a new survey.</p>
      <p className='red-text'>TODO: additional functionality</p>
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
