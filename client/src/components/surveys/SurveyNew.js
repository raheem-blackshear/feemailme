import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

/*
* SurveyNew shows SurveyForm and SurveyFormReview Components
*/
class SurveyNew extends Component {

  // Set component level state for displaying survey
  state = { showFormReview: false };
  /* The line above is a shortcut that also implicitly does the following:
      constructor(props) {
        // Pass state to superclass constructor
        super(props);
        // Set state's 'new' property to true
        this.state = { new: true };
      }
  */

  /*
  * Displays either a new form for user to fill out or their filled-out form for review.
  */
  renderContent() {
    // If the user already filled out the form in the prior screen,
    // show confirmation/review page.
    if (this.state.showFormReview) {
      return <SurveyFormReview
              onCancel={ () => this.setState( { showFormReview: false } )}
              />;
    }

    // Display new form; if user fills it out and attempts to submit it,
    // run callback to update state so that SurveyFormReview displays form for review.
    return (<SurveyForm
            onSurveySubmit={ () => this.setState({ showFormReview: true }) }
            />
          );
  }

  /*
  * Display the appropriate form returned by renderContent().
  */
  render() {
    return (
      <div>
        { this.renderContent() }
      </div>

    );
  }
};

export default reduxForm({
  form: 'surveyForm',
  // Dump form values if navigating away from SurveyNew (note: this is default behavior)
  destroyOnUnmount: true
})(SurveyNew);
