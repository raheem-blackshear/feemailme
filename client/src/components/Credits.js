import React from 'react';

/*
* Display logged-in user's available credits
*/
const Credits = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      Credits: {props.credits}
    </div>
  );
};

export default Credits;
