function handleFailedPolicies(failedPolicies = []) {
  if (!Array.isArray(failedPolicies)) return '';
  if (failedPolicies?.length) {
    const validationFailure = failedPolicies.reduce((prev, curr) => {
      let failureObj;
      try {
        failureObj = JSON.parse(curr);
      } catch (err) {
        console.log(`Parsing failure for ${err.message}`);
      }
      switch (failureObj.policyRequirement) {
        case 'REQUIRED':
          prev = `This field is required`;
          break;
        case 'VALID_USERNAME':
          prev = `Please choose a different username. `;
          break;
        case 'VALID_EMAIL_ADDRESS_FORMAT':
          prev = `Please use a valid email address. `;
          break;
        default:
          prev = `Please check this value for correctness.`;
      }
      return prev;
    }, '');
    return validationFailure;
  }
  return '';
}

export { handleFailedPolicies };
