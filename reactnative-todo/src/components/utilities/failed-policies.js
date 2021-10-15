/*
 * forgerock-react-native-sample
 *
 * failed-policies.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

function handleFailedPolicies(failedPolicies = []) {
  /*
   * When we initialize, failedPolicies come back as an object so we can ignore
   */
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
