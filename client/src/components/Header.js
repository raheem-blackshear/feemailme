import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import Login from './Login';
import Logout from './Logout';
import Greeting from './Greeting';
import Credits from './Credits';

/*
* Header bar at the top of App
*/
class Header extends Component {
  /*
  * Render content corresponding to user state
  */
  renderUserContent() {
    switch (this.props.auth) {
      // Determining whether logged in or not
      case null:
        return <li>Checking login status...</li>;
      // User is not logged in
      case false:
        return <li><Login /></li>;
      // User is logged in
      default:
        return [
          <li key={Greeting}><Greeting
            name={this.props.auth.firstName}
           /></li>,
          <li key={Payments}><Payments
            email={this.props.auth.email}
          /></li>,
          <li key={Credits}><Credits
            credits={this.props.auth.credits}
          /></li>,
          <li key={Logout}><Logout /></li>
        ];
    }
  }

  /*
  * Render the full Header bar
  */
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={(this.props.auth ? '/surveys' : '/')}
            className='left brand-logo'
          >FeeMail</Link>
          <ul className='right'>
              { this.renderUserContent() }
          </ul>
        </div>
      </nav>
    );
  }
};

/*
* @param {state} object returned by combineReducers has 1 property: auth
* @returns {Object} Passed to header as props
*/
function mapStateToProps({ auth }) {
  return {auth};
}

export default connect(mapStateToProps)(Header);
