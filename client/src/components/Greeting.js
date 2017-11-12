import React from 'react';

/*
* Display user greeting
*/
const Greeting = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      Welcome&#44; {props.name}&#33;
    </div>
  );
};

export default Greeting;
