/*
* The survey fields for a form
*/
// NOTE: isRequired is overkill I wrote in the event that optional fields are added (probably a better way of doing it I should look up).
export default [
  { name: 'title', label: 'Survey Title', isRequired: true,
    description: 'The survey identifier in Dashboard.' },
  { name: 'subject', label: 'Email Subject', isRequired: true,
    description: 'The email survey subject line.' },
  { name: 'body', label: 'Email Body', isRequired: true,
    description: 'The email survey body.' },
  { name: 'recipients', label: 'Recipient List', isRequired: true,
    description: 'A comma or space-separated list of email addresses.'}
];
