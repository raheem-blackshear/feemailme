import React from 'react';

/*
* Display logged-in user's available credits
*/
const AvailableCredits = (props) => {

  return (
    <div
      className='chip blue lighten-2 white-text'
      title='Total available credits'
      >
      Credits: {props.credits}
    </div>
  );
};

export default AvailableCredits;
