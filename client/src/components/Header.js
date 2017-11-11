import React, { Component } from 'react';

/*
*
*/
class Header extends Component {
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <a className='left brand-logo'>MailProject</a>
          <ul className='right'>
            <li>
            <a href="/auth/google">Log in with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Header;
