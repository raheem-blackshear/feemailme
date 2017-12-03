const keys = require('../../config/keys');

/*
* @param {Object} A survey object containing subject, recipients.
* The HTML body for an email.
*/
module.exports = (survey) => {
  // TODO FINISH ME
  return `
    <html>
      <body style="text-align: center;">
        <h3>Can you help us improve?</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.surveyRedirectDomain}/api/surveys/submitted-response">Yes</a>
        </div>
        <div>
          <a href="${keys.surveyRedirectDomain}/api/surveys/submitted-response">No</a>
        </div>
      </body>
    </html>
  `;
};

// TODO Update hrefs
