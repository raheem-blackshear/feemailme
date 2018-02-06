import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

/*
* Shows the list of Surveys (in Dashboard) created by the user.
*/
class SurveyList extends Component {
  /**
  *   Call the fetchSurveys action creator any time this component renders
  **/
  componentDidMount() {

    this.props.fetchSurveys();
  }

  /**
  *   Render the list of surveys.
  **/
  renderSurveys() {

    // Reverse list of surveys to ensure newest are at the top TODO: add custom sorting
    return this.props.surveys.reverse().map( (survey) => {
      return (
        <div className='card blue lighten-4' key={survey._id}>
          <div className='card-content'>
            <div title='Date sent' className='right chip blue lighten-2 white-text'>Sent on {new Date(survey.dateSent).toLocaleDateString()}</div>
            <p title='The survey title' className='card-title flow-text'><h4>{survey.title}</h4></p>
            <span className='divider' />
            <p title='The email subject' className='flow-text'><h5>{survey.subject}</h5></p>
            <p title='The email body' className='flow-text'><h6>{survey.body}</h6></p>
            <div title='Response data'>
              <div title='Responses' className='chip blue lighten-2 white-text'>Yes: {survey.yes}</div>
              <div title='Responses' className='chip blue lighten-2 white-text'>No: {survey.no}</div>
              <div title='Last response' className='right chip blue lighten-2 white-text'>{ (survey.lastResponded) ? 'Last response on ' + new Date(survey.lastResponded).toLocaleDateString() : 'No responses.'}</div>
            </div>
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <div>{ this.renderSurveys() }</div>
    );
  }
}

/*
* Used with connect helper to map redux state to props being sent to component
* @param {Object} state The redux state; pull out 'surveys' property
*/
function mapStateToProps({ surveys }) {
  // Property created by reducer is called surveys
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
