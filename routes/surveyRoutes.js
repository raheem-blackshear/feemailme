/*
* Survey Routes
*/
/** [lodash Documentation]{@link https://lodash.com/docs/} **/
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const loginRequired = require('../middlewares/loginRequired');
const creditsRequired = require('../middlewares/creditsRequired');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

/* Return Function with Route Handlers */
module.exports = (app) => {
  /*
  * Return current_user's survey list.
  * Check user is logged in.
  */
  app.get('/api/surveys',
    loginRequired,
    async (req, res) => {
      // Fetch all surveys where _id matches _user_id
      const surveys = await Survey.find({ _user: req.user.id })
        // Exclude recipients field (potentially large data) from query object returned by 'find'
        .select({ recipients: false });
      res.send(surveys);
    }
  );

  /*
  * POST Requests from Survey Manager
  * Create a new survey and send out survey to recipients.
  */
  app.post('/api/surveys',
    loginRequired,
    creditsRequired,
    // mailer.send() is async
    async (req, res) => {
      // Access Model Instance properties from request body.
      const { title, subject, body, recipients } = req.body;

      /*
      * @param {String} title The survey's title within the survey list.
      * @param {String} subject The survey email subject line.
      * @param {String} body The survey email body.
      * @param {String} recipients A comma-separated String of recipient email addresses.
      */
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
          .trim()
          .split(/[, ]+/)
          // Remove any empty string addresses in case of accidental leading/trailing comma
          .filter( address => address.length )
          // Create an object with email property and assign it value of email address
          .map( (email) => ({ email })),
        _user: req.user.id,
        // TODO Change this init val to actual time survey is sent.
        dateSent: Date.now()
      });

      /* Create a mailer, passing it the survey (subject/recipients) and HTML body */
      const mailer = new Mailer(survey, surveyTemplate(survey));
      try {
        await mailer.send();
        // Save survey to DB
        await survey.save();
        // Decrement credits
        req.user.credits -= 1;
        const user = await req.user.save();

        // Send back updated user model returned by DB
        res.send(user);
      }
      catch (err) {
        // Tell user something was unprocessable
        res.status(422).send(err);
      }
    }
  );

  /**
  * POST Requests from Sendgrid
  * Update MongoDB with new survey responses.
  **/
  app.post('/api/surveys/webhooks', (req, res) => {
    // Extract URL and choice
    const p = new Path('/api/surveys/:surveyId/:surveyResponse');

    // This is technically async code, but no response is needed for subsequent code
    // Use chain helper to to chain lodash helpers
    _.chain(req.body)
      // Get 'email' and 'route' from 'event'
      .map(( { email, url } ) => {
          // Extract pathname using URL helper and attempt to match
          // Returns null if no match; otherwise, returns object
          const match = p.test(new URL(url).pathname);
          if (match) {
            return {
              email,
              surveyId: match.surveyId,
              choice: match.surveyResponse
            };
          }
        }
      )
      // Remove falsey values from events array and return new array of filtered values
      .compact()
      // Remove duplicates so there is only one response per distinct 'email' for each 'surveyId'
      .uniqBy('email', 'surveyId')
      // Runs over every 'event' element in array, pull out needed properties
      .each( ({ surveyId, email, choice }) => {
        // Look at Survey collection, find and update the distinct document matching the following criteria
        Survey.updateOne({
          // Look for the survey whose _id matches surveyId
          _id: surveyId,
          // Look in the survey's recipient list and find a single element matching the given email address that also has a responded property of false
          recipients: {
            $elemMatch: {
              email,
              responded: false
            }
          }
        }, { // After the distinct survey is found, make this update to it:
          /*  $inc is the increment operator that increments a field (or fields) in the next object
          *   https://docs.mongodb.com/manual/reference/operator/update/inc/#up._S_inc
          *   [ choice ] is key interpolation; we want to access the value corresponding to the 'choice' property ('Yes' or 'No')
          *   This code increments the value for the interpolated key by 1
          */
          $inc: {[ choice ]: 1},
          /*  Set/Update the 'responded' property in the recipients subdocument collection for the survey that was found by the query
          */
          $set: { 'recipients.$.responded': true },
          // Update timestamp for most recent response to survey
          lastResponded: new Date()
        // execute query
      }).exec();
    })
    // Pull out underlying filtered array
    .value();
  });

  /*
  * Page to display after responding to a survey.
  * TODO display a prettier page
  */
  app.get('/api/surveys/:surveyId/:choice',
    (req, res) => {
      res.send(`<div style="text-align: center; margin-top: 20%;">Thank you for your feedback!</div>`);
    }
  );

  /*
  * POST Requests from Survey Manager
  */
  app.post('/api/surveys/webhooks',
    loginRequired,
    async (req, res) => {

      const user = await req.user.save();
      res.send(user);
    }
  );
};
