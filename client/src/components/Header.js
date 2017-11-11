import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/*
*
*/
class Header extends Component {


  /*
  *
  */
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'Checking login status...';
      case false:
        return <a href="/auth/google">Log in with Google</a>;
      default:
        return <a href="/api/logout">Welcome, {this.props.auth.firstName}! &sdot; [Log out]</a>;
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={(this.props.auth ? '/surveys' : '/')}
            className='left brand-logo'
          >FeeMail</Link>
          <ul className='right'>
            <li>
              { this.renderContent() }
            </li>
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
