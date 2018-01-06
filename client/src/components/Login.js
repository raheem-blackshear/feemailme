import React from 'react';

/*
* Click to log in
*/
const Login = () => {

  return (
    <a href='/auth/google'
    title='Sign in with Google'
    ><button className='btn waves-effect waves-light blue lighten-2 login--google' /></a>
  );
};
// TODO Add marketing buttons
// TODO Add another auth provider

export default Login;
