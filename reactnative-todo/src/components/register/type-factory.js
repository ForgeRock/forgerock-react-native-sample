const registrationTypeFactory =
  (
    username,
    password,
    first,
    last,
    email,
    specials,
    updates,
    securityQuestion,
    terms,
  ) =>
  (type = 'default') =>
    ({
      Username: username,
      Password: password,
      'First Name': first,
      'Last Name': last,
      'Email Address': email,
      'Send me special offers and services': specials,
      'Send me news and updates': updates,
      'Select a security question': securityQuestion,
      default: terms,
    }[type]);

export { registrationTypeFactory };
