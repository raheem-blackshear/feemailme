/*
* Survey Routes
*/
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
    (req, res) => {
      res.send(req.user);
      res.redirect('');
    }
  );

  /*
  * POST Requests from Survey Manager
  * Create a new survey and send out survey to recipients.
  * @param {String} title The survey's title within the survey list.
  * @param {String} subject The survey email subject line.
  * @param {String} body The survey email body.
  * @param {String} recipients A comma-separated String of recipient email addresses.
  */
  app.post('/api/surveys',
    loginRequired,
    creditsRequired,
    // mailer.send() is async
    async (req, res) => {
      // Access Model Instance properties from request body.
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.trim().split(new RegExp('[, ]+'))
          // Create an object with email property and assign it value of email address
          .map( (email) => ({ email })),
        _user: req.user.id,
        // TODO Change this init val to actual time survey is sent.
        dateSent: Date.now()
        // TODO: add redirect URL property for better customized response routing
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

  /*
  * Page to display after responding to a survey.
  * TODO display a prettier page
  */
  app.get('/api/surveys/submitted-response',
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
