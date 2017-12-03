/*
* Email validation expression from [EmailRegEx]{@link www.emailregex.com}
* could also use isEmail from the validator package instead.
*/
const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*
* Validates a string of email addresses against the JS RegEx
* @param {String} recipients A comma and/or space-separated list of email addresses.
*/
export default (recipients) => {

  const invalidEmails = recipients.trim().split(/[, ]+/)
    // Only return values where validation RegEx is false
    .filter( address => emailValidator.test(address) === false && address.length );
    // && address.length ignores empty string in the event of a leading/trailing comma

  // If invalidEmails doesn't contain 0 invalid emails, error.
  if (invalidEmails.length) {
    return `The following email addresses are invalid: ${invalidEmails.join(', ')}`;
  }

  return true;
};
