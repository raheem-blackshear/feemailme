import React, { Component } from 'react';
/* 'redux-form' Helpers:
*   reduxForm tells redux-form it needs to control any forms inside this component, similar to 'connect'.
*   Field renders any type of traditional HTML form element (requires some number of minimum props).
*/
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';
import formFields from './formFields';

/*
* Display a form for user to add input to.
* SurveyForm shows SurveyField Components.
*/
class SurveyForm extends Component {
  /*
  * Renders all SurveyFields in formFields.
  * Uses lodash.map to create an array of custom redux-form fields
  * for each field specified in formFields.
  */
  renderFields() {
    // Iterate through formFields, create the field, map returns it in a new array
    return _.map(formFields, ({ name, label, description, isRequired }) => {
        return (
          <Field type='text' key={name}
            name={ name }
            label={ label }
            component={ SurveyField }
            description={ description }
            isRequired={ isRequired }
          />
        )
      }
    );
  }

  render() {
    return (
      <div>
        <h4 className='center'>Survey Fields</h4>
        <form
          onSubmit={
            // A function handling form submissions
            // reduxForm will handle passing on the values
            this.props.handleSubmit( this.props.onSurveySubmit )
            // Function is called w/o () so JS only calls it upon attempted submit
          }>
          { this.renderFields() }
          <Link className='left btn waves-effect waves-light blue lighten-2'
            type='cancel' to='/surveys'>Cancel
            <i className='material-icons right'>cancel</i>
          </Link>
          <button className='right btn waves-effect waves-light blue lighten-2'
            type='submit'>Continue
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
};

/*
* @param {Object} values All the different values in a submitted form's fields.
* @return {Object} If empty, redux-form assumes form's contents are valid.
*   redux-form automatically matches up titles to the fields rendered above.
*/
function validate(values) {
  const errors = {};
  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients || '');
  }
  _.each(formFields, ( { name, label, isRequired } ) => {
    // Check if field is required
    if (isRequired) {
      // If field is empty, or if field exists but is empty after being trimmed
      if (!values[name] || !values[name].trim()) {
        errors[name] = `Please complete the '${label}' field to proceed.`
      }
    }
  });

  return errors;
}

/*
* ReduxForm helper to initialize and configure the survey form.
*/
export default reduxForm({
  // Field validation
  validate,
  // The namespace for ReduxForm to use
  form: 'surveyForm',
  // Keep survey values so they're still accessible in SurveyFormReview
  destroyOnUnmount: false
})(SurveyForm);
