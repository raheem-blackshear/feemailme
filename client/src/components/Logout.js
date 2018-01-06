import React from 'react';

/*
* Click to log out
*/
const Logout = () => {
  return (
    <div title='Click to log out'>
      <a
        className='btn blue lighten-2 waves-effect waves-light'
        href='/api/logout'
      >Log Out</a>
    </div>
  );
};

export default Logout;
