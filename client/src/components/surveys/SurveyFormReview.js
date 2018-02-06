/*
* Show user form inputs for final review.
*/
import React from 'react';
// Reach into redux store and pull out form values for review
import { connect } from 'react-redux';
// Let SurveyFormReview know about the 'history' object provided by react-router
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import _ from 'lodash';
// Action creator for submit
import * as actions from '../../actions';

/*
* Assemble a completed survey form for the user to do a final review before sending.
*/
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // Use lodash.map to create an array of redux-form fields to render
  const fieldsToRender = _.map(formFields,
    ({ name, label }) => {
      return (
        <div key={ name }>
          <div className='section'>
            <label>{ label }</label>
            <div>{ formValues[name] }</div>
          </div>
          <div className='divider'></div>
        </div>
      )
    }
  );

  // TODO make spacing more consistent between new/edit and confirmation screens
  return (
    <div>
      <h4 className='center'>Confirm Entries Before Sending</h4>
      <div style={{ paddingBottom: '16px'}}>{ fieldsToRender }</div>
      <button
        title='Modify survey'
        className='left btn waves-effect waves-light blue lighten-2'
        onClick={ onCancel }
      >Edit
      <i className='material-icons right'>edit</i>
      </button>
      <button
        title='The point of no return!'
        className='right btn waves-effect waves-light blue lighten-2'
        type='submit'
        onClick={ () => { submitSurvey(formValues, history) } }
      >Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

/*
* Used with connect helper to map redux state to props being sent to component
* @param {Object} state The redux state
* @return {Object} The props for the SurveyFormReview component
*/
function mapStateToProps(state) {
  
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
