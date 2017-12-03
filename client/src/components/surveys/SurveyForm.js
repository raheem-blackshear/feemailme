import React, { Component } from 'react';
/* 'redux-form' Helpers:
*   reduxForm tells redux-form it needs to control any forms inside this component, similar to 'connect'
*   Field renders any type of traditional HTML form element (requires some number of minimum props).
*/
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';

// NOTE: isRequired is overkill I wrote in the event that optional fields are added.
const SURVEY_FIELDS = [
  { name: 'title', label: 'Survey Title', isRequired: true,
    description: 'The survey identifier in Dashboard.' },
  { name: 'subject', label: 'Email Subject', isRequired: true,
    description: 'The email survey subject line.' },
  { name: 'body', label: 'Email Body', isRequired: true,
    description: 'The email survey body.' },
  { name: 'recipients', label: 'Recipient List', isRequired: true,
    description: 'A comma or space-separated list of email addresses.'}
];

/*
* Display a form for user to add input to.
* SurveyForm shows SurveyField Components.
*/
class SurveyForm extends Component {
  /*
  * Renders all SurveyFields in SURVEY_FIELDS
  * Uses lodash.map to create an array of custom redux-form fields
  * for each field specified in SURVEY_FIELDS.
  */
  renderFields() {
    // Iterate through SURVEY_FIELDS, create the field, map returns it in a new array
    return _.map(SURVEY_FIELDS, ({ name, label, description, isRequired }) => {
        return (
          <Field type="text" key={name}
            name={name}
            label={label}
            component={SurveyField}
            description={description}
            isRequired={isRequired}
          />
        )
      }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(
          // A function handling form submissions
          (values) => { console.log(values) }
        ) }>
          { this.renderFields() }
          <Link className="btn left" type="cancel" to="/surveys">Cancel
            <i className="material-icons right">cancel</i>
          </Link>
          <button className="btn right" type="submit">Continue
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>

    );
  }
};

/*
* @param {Object} values All the different values in a submitted form's fields.
* @return {Object} If empty, redux-form assumes form's contents are valid.
*   redux-form automaticall matches up titles to the fields rendered above.
*/
function validate(values) {
  const errors = {};
  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients);
  }
  _.each(SURVEY_FIELDS, ( { name, label, isRequired } ) => {
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

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
