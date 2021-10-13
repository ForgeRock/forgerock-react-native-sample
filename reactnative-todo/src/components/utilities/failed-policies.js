function handleFailedPolicies(output = []) {
  const failedPolicies =
    output.find((val) => val.name === 'failedPolicies')?.value ?? [];
  if (failedPolicies?.length) {
    const validationFailure = failedPolicies.reduce((prev, curr) => {
      let failureObj;
      try {
        failureObj = JSON.parse(curr);
      } catch (err) {
        console.log(`Parsing failure for ${textInputLabel}`);
      }
      console.log(failureObj);
      switch (failureObj.policyRequirement) {
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
