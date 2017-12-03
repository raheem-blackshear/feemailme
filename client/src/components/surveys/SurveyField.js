import React from 'react';
/*
* Logic for rendering a single label and text field input.
* @param {Object} props.input
*/
export default ( { input, label, description, isRequired, meta: {error, touched} }) => {

  // redux-form watches 'input' for any event and records its value
  return(
    <div style={{ marginTop: '16px', marginBottom: '4px'}} title={description}>
      <label>{label}</label>
      {/* If the field has been touched and contains an error, display error. */}
      <label className="right red-text">{touched && error}</label>
      {/* Pass input the props.input object and all the keys and values associated with it */}
      <input {...input}
        placeholder={ (touched && isRequired) ? `'${label}' is a required field.` : '' }
      />
      {/* Placeholder text only displays after field is touched but not filled */}
    </div>
  );
};
