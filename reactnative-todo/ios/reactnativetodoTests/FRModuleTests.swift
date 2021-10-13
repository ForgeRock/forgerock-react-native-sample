//
//  FRModuleTests.swift
//  PropertyFinderTests
//
//  Created by George Bafaloukas on 03/09/2021.
//

import XCTest

class FRModuleTests: XCTestCase {
  override func tearDown() {
    frAuth.logout()
    sleep(2)
  }

  let frAuth = FRAuthBridge()

  let exampleRegisterResponse = "{\"callbacks\":[{\"type\":\"ValidatedCreateUsernameCallback\",\"output\":[{\"name\":\"policies\",\"value\":{\"policyRequirements\":[\"REQUIRED\",\"MIN_LENGTH\",\"VALID_TYPE\",\"VALID_USERNAME\",\"CANNOT_CONTAIN_CHARACTERS\",\"MAX_LENGTH\"],\"fallbackPolicies\":null,\"name\":\"userName\",\"policies\":[{\"policyRequirements\":[\"REQUIRED\"],\"policyId\":\"required\"},{\"policyRequirements\":[\"REQUIRED\"],\"policyId\":\"not-empty\"},{\"policyRequirements\":[\"MIN_LENGTH\"],\"policyId\":\"minimum-length\",\"params\":{\"minLength\":1}},{\"policyRequirements\":[\"VALID_TYPE\"],\"policyId\":\"valid-type\",\"params\":{\"types\":[\"string\"]}},{\"policyId\":\"valid-username\",\"policyRequirements\":[\"VALID_USERNAME\"]},{\"policyId\":\"cannot-contain-characters\",\"policyRequirements\":[\"CANNOT_CONTAIN_CHARACTERS\"]},{\"policyId\":\"minimum-length\",\"params\":{\"minLength\":1},\"policyRequirements\":[\"MIN_LENGTH\"]},{\"policyId\":\"maximum-length\",\"params\":{\"maxLength\":255},\"policyRequirements\":[\"MAX_LENGTH\"]}],\"conditionalPolicies\":null}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"prompt\",\"value\":\"Username\"}],\"input\":[{\"name\":\"IDToken1\",\"value\":\"gbafal5\"},{\"name\":\"IDToken1validateOnly\",\"value\":false}],\"_id\":0},{\"type\":\"StringAttributeInputCallback\",\"output\":[{\"name\":\"name\",\"value\":\"givenName\"},{\"name\":\"prompt\",\"value\":\"First Name\"},{\"name\":\"required\",\"value\":true},{\"name\":\"policies\",\"value\":{\"policyRequirements\":[\"REQUIRED\",\"VALID_TYPE\"],\"fallbackPolicies\":null,\"name\":\"givenName\",\"policies\":[{\"policyRequirements\":[\"REQUIRED\"],\"policyId\":\"required\"},{\"policyRequirements\":[\"VALID_TYPE\"],\"policyId\":\"valid-type\",\"params\":{\"types\":[\"string\"]}}],\"conditionalPolicies\":null}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"value\",\"value\":\"\"}],\"input\":[{\"name\":\"IDToken2\",\"value\":\"g\"},{\"name\":\"IDToken2validateOnly\",\"value\":false}],\"_id\":1},{\"type\":\"StringAttributeInputCallback\",\"output\":[{\"name\":\"name\",\"value\":\"sn\"},{\"name\":\"prompt\",\"value\":\"Last Name\"},{\"name\":\"required\",\"value\":true},{\"name\":\"policies\",\"value\":{\"policyRequirements\":[\"REQUIRED\",\"VALID_TYPE\"],\"fallbackPolicies\":null,\"name\":\"sn\",\"policies\":[{\"policyRequirements\":[\"REQUIRED\"],\"policyId\":\"required\"},{\"policyRequirements\":[\"VALID_TYPE\"],\"policyId\":\"valid-type\",\"params\":{\"types\":[\"string\"]}}],\"conditionalPolicies\":null}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"value\",\"value\":\"\"}],\"input\":[{\"name\":\"IDToken3\",\"value\":\"b\"},{\"name\":\"IDToken3validateOnly\",\"value\":false}],\"_id\":2},{\"type\":\"StringAttributeInputCallback\",\"output\":[{\"name\":\"name\",\"value\":\"mail\"},{\"name\":\"prompt\",\"value\":\"Email Address\"},{\"name\":\"required\",\"value\":true},{\"name\":\"policies\",\"value\":{\"policyRequirements\":[\"REQUIRED\",\"VALID_TYPE\",\"VALID_EMAIL_ADDRESS_FORMAT\"],\"fallbackPolicies\":null,\"name\":\"mail\",\"policies\":[{\"policyRequirements\":[\"REQUIRED\"],\"policyId\":\"required\"},{\"policyRequirements\":[\"VALID_TYPE\"],\"policyId\":\"valid-type\",\"params\":{\"types\":[\"string\"]}},{\"policyId\":\"valid-email-address-format\",\"policyRequirements\":[\"VALID_EMAIL_ADDRESS_FORMAT\"]}],\"conditionalPolicies\":null}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"value\",\"value\":\"\"}],\"input\":[{\"name\":\"IDToken4\",\"value\":\"gbafal3@test.com\"},{\"name\":\"IDToken4validateOnly\",\"value\":false}],\"_id\":3},{\"type\":\"BooleanAttributeInputCallback\",\"output\":[{\"name\":\"name\",\"value\":\"preferences marketing\"},{\"name\":\"prompt\",\"value\":\"Send me special offers and services\"},{\"name\":\"required\",\"value\":true},{\"name\":\"policies\",\"value\":{}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"value\",\"value\":false}],\"input\":[{\"name\":\"IDToken5\",\"value\":true},{\"name\":\"IDToken5validateOnly\",\"value\":false}],\"_id\":4},{\"type\":\"BooleanAttributeInputCallback\",\"output\":[{\"name\":\"name\",\"value\":\"preferences updates\"},{\"name\":\"prompt\",\"value\":\"Send me news and updates\"},{\"name\":\"required\",\"value\":true},{\"name\":\"policies\",\"value\":{}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"value\",\"value\":false}],\"input\":[{\"name\":\"IDToken6\",\"value\":true},{\"name\":\"IDToken6validateOnly\",\"value\":false}],\"_id\":5},{\"type\":\"ValidatedCreatePasswordCallback\",\"output\":[{\"name\":\"echoOn\",\"value\":false},{\"name\":\"policies\",\"value\":{\"policyRequirements\":[\"VALID_TYPE\"],\"fallbackPolicies\":null,\"name\":\"password\",\"policies\":[{\"policyRequirements\":[\"VALID_TYPE\"],\"policyId\":\"valid-type\",\"params\":{\"types\":[\"string\"]}}],\"conditionalPolicies\":null}},{\"name\":\"failedPolicies\",\"value\":[]},{\"name\":\"validateOnly\",\"value\":false},{\"name\":\"prompt\",\"value\":\"Password\"}],\"input\":[{\"name\":\"IDToken7\",\"value\":\"Password1!\"},{\"name\":\"IDToken7validateOnly\",\"value\":false}],\"_id\":6},{\"type\":\"KbaCreateCallback\",\"output\":[{\"name\":\"prompt\",\"value\":\"Select a security question\"},{\"name\":\"predefinedQuestions\",\"value\":[\"What's your favorite color?\"]}],\"input\":[{\"name\":\"IDToken8question\",\"value\":\"What's your favorite color?\"},{\"name\":\"IDToken8answer\",\"value\":\"Blue\"}],\"_id\":7},{\"type\":\"TermsAndConditionsCallback\",\"output\":[{\"name\":\"version\",\"value\":\"0.0\"},{\"name\":\"terms\",\"value\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"},{\"name\":\"createDate\",\"value\":\"2019-10-28T04:20:11.320Z\"}],\"input\":[{\"name\":\"IDToken9\",\"value\":true}],\"_id\":8}],\"header\":\"Sign Up\",\"description\":\"Signing up is fast and easy.<br>Already have an account?\",\"status\":200,\"ok\":true}"


  let exampleLoginResponse = "{\"authId\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6IlNpbXBsZUxvZ2luIiwib3RrIjoianZpc3JlZzR2OTVza2VyN3FyY3A3bTE3NTYiLCJhdXRoSW5kZXhUeXBlIjoic2VydmljZSIsInJlYWxtIjoiL2FscGhhIiwic2Vzc2lvbklkIjoiKkFBSlRTUUFDTURJQUJIUjVjR1VBQ0VwWFZGOUJWVlJJQUFKVE1RQUNNREUuKmV5SjBlWEFpT2lKS1YxUWlMQ0pqZEhraU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuWlhsS01HVllRV2xQYVVwTFZqRlJhVXhEU214aWJVMXBUMmxLUWsxVVNUUlJNRXBFVEZWb1ZFMXFWVEpKYVhkcFdWZDRia2xxYjJsYVIyeDVTVzR3TGk1SExWTTVSMUpuWkZoMU5EVldSMUZyYUdOVVdXRlJMa3REU1ZGRVZ6WkZPVzlOWm5ndGNEVnNkbkEzWkZWNldVbDNSMWRUU1dFemVHbFliMEZvY0VSc05FTTNiV2RsZURSUWQzQkRNbk5GU1ZkTmRrNXJObVl3UVhkQ1RtUTFkamxLWlRnMFdWZEVPVzk2VFRScVZGQnJhMGhuV0Zsb00ycHdXVUZpTFZaeWF5MUlPRXAwZEZrNVVGaHVRMTg0YjNaMGNsaHpWamRaT1dST1VIbHRjazU1Y1dkaFdGbDBXakI1VkZrME1rNTVTM1ZCV1ZKcmNVZDBXWFJHVDJWSmFYUkdTWGx1TmtWYVpXeHlSSEpmTFU4M2RIZHRSMGxaUjNWSVJVMUhNa3Q1VXpaT1ZUZDNXamRVZURWalJFdGZNM1ZwWmpWc2RqTXlkR0ZrVVdSd1kzbEdhV1ExZVhrMGNIbFNNaTFXVFRSV01tSnJjVFJQWVhkR1luUlZMVXgwVFUwNWNXeFplbWxXYmpKVllqUkVRMjAxUkRaUlRVZE5hMUJTVTJ3NVRHZ3hVbWRGZDBnM1EzSlpUamxCTUdoQ2NERmpVbGgxUjNaYU5tbGhOMGx1ZWkwMFUxcGZValZvWTNSd1VHZEdNQzFmZG1WNFJWZE1WM3AxZWxwNWFEUmtPR3A2Tmw5UFYwbGhZMUZ0VlVGUFNrUkNVVWxOTXpKbGRVSnZRV2RoYVUwdE5rTkxka0p1TWxJelVIUkJTRVpGYWpNdFpIaExWMmN4YWpOVGRuSnFiVE5OUm5ZNVpERTNiamxsVWpoU1JUY3haM3BoTWxkTGR6aEtUMmxGYTNsMmJsSk9OWFp3VUhSd2VHVXlNa051TURGSlZqZGxNRlp3V0VsRE5tNU5PVkJmWTFweExVdFZNVXRMTm1oSWNrMUtjMXB3TkdWblZsZFJhSEJzTjFoNmFXRkVVeTAzWHpWU1JIQTBOVlExYW5od2JITm9XVjlmZWtGUlRVMDFTSFkxT1dSMGJHeE1OMlZmTWw5bk9GWlpRVEZLYm5kVmRraDNjMEZUVG5sVFkyMVZXR1pYUldVMFFXNUpTa1p2TldacFFVOUpiRWRLV0hoS1RWcGxhRXhMZHpKaE1XcGtaRkZVY0VNM01qWk9XR05aYTNsWFNXazNkREpxU0hsbWFFVktUM290WVVsWWJuVjZPWFY0WmtaRE1VTjZhSGhsUTFCbmFuYzBkMUJvV1VVd2IzWm5MbVU1V1Y5T2FtY3laa3BwVmsxT1ZWbFZibWRITVZFLlkyOGpGcC1xY05LaEtnNzZ2RlNGWV8wR3VoNk43SHRhS2Faa2RmMWNSdTgiLCJleHAiOjE2MzA2ODIzODEsImlhdCI6MTYzMDY4MjA4MX0.9iztYGjsKSmAm7CsOtvCOKySeQbU7kcjWhWhP8sXXeM\",\"callbacks\":[{\"type\":\"NameCallback\",\"output\":[{\"name\":\"prompt\",\"value\":\"User Name\"}],\"input\":[{\"name\":\"IDToken1\",\"value\":\"gbafal\"}],\"_id\":0},{\"type\":\"PasswordCallback\",\"output\":[{\"name\":\"prompt\",\"value\":\"Password\"}],\"input\":[{\"name\":\"IDToken2\",\"value\":\"Password1!\"}],\"_id\":1}],\"status\":200,\"ok\":true}"

  let exampleKBAResponse = "{\"authId\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6IlNpbXBsZUxvZ2luIiwib3RrIjoicXNobWJxZ2FsYzdvaDAzdjhqZzViYjkyNXUiLCJhdXRoSW5kZXhUeXBlIjoic2VydmljZSIsInJlYWxtIjoiL2FscGhhIiwic2Vzc2lvbklkIjoiKkFBSlRTUUFDTURJQUJIUjVjR1VBQ0VwWFZGOUJWVlJJQUFKVE1RQUNNREUuKmV5SjBlWEFpT2lKS1YxUWlMQ0pqZEhraU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuWlhsS01HVllRV2xQYVVwTFZqRlJhVXhEU214aWJVMXBUMmxLUWsxVVNUUlJNRXBFVEZWb1ZFMXFWVEpKYVhkcFdWZDRia2xxYjJsYVIyeDVTVzR3TGk1eGVtRnliMUpUWDNVNFRGcFdYM2hpWDBGNU9ERm5MbHBCVUZkdU9IaFlaMncwZUhWWVkzVkxTekZaUVVwblVVMXZUamRpV0U0MGJWTkhOelJsY1hkRlpFaHVZMDVVV0hKT1VtZHVZa0pVTlZKeWIzbHlibVIzUVZRMWJXWTNRMXBVY25CaU1GcGhaSFo2Y1hCT01HNDVSbXRMUjFGeVVtZEtjRXBzT1ZBdGQxQmtXVzlOYjFSdk1rNXNiRGxFTFcxdVltVkpTMmt3Vmt0c09IQTNUVkJ5UTI5UVNuQnZjRnBWTmxSQ2NUQkhiMjQxTXpSb1dYaHZOMFpQWVdwcVRsbzJSMjEwVjJ0b1lsOW9TWGhwZHpGYWEzTkdVMjl3Um5nMlQyeEJNV1UwYjFkMGF6azJZbFI2TlRCTVJWOVhXWHB0YzFwWGVVc3RablpIWm01MFFtWlBWMk55WHpGNldqZzFNbE16VkVOZlpXSjBWRlp5YzNkNlZpMXJUVEZ6UmpaNGJqRmxMWFJ5TmxkS2VUbFpUemR3UWxwMFZqWjRZVjk1YkRsUlNVMUJkRFpWYWt4SFowRlVkM013WTI4d2JEVmZZWGR3YlRWRE1YTTJUblpuYm10SGJtTTFSRGxFU0VoeVp6WkhUMVZFU2pGU1p6ZE1TRlZ6VDIxclJXZFlYMHB6Ums1Qk0xZDFVMlpDZVZvMlVUaDZPVk0yV1ZCSGJVWkRURUYzWTBkRGQwNWlaRlpLVTNBMU0yUlFVVEo0WDFaRkxYYzJRemxXV1VZd2JYQnhUbmwyTW1oT1pFb3lSMXBVVlUxTWVFTjNMWGRJU3pWQ1F6UjBUa3RDYTB0WU5FNDBTMUpOTkRsaVRGRnlkMkZEUW1aZmJYbGlSV2t6YzJkNFJHOXZTRXhxU0hWRU9UUTVjbEo1ZG1aaVVISXRTVVYxVmtRM1EwTkpkV2x2ZFVGbWQxSklWSHBHWjB0eGRYRm1NVWR0UmxoUVRHVmZiREphVTBFdGFTMVVjMHRqUTBscmNDMDNNRTFHZDI1V1MyRXpMV3RFVm1OaFRFSnVlSGhOYjBaaWEyWlhUR1pVY0dkcE5teDZSR3hsYmxNeWNIWnlPRVk0UjBaR1prVldVRzVIU0Zoc2VqZE5OazFGTkU5SlZ6VTBlVVo1UjFNNU5WUlZOMFo1UmtKTExXZEVOMjh5TFZFeFJqZDVVakpCZFc0eldIRjJha2xTTldKS2VHZFFiSFl4YzFkSGVHNVdZMkpwVVRJelpHSk5UMWRHZEc5a1JsQmpTbkJuUkY4NU5sZGFlSFZIV0RGWFJIVjJOV0ZmU1hkYVYxWlNZVVUxUXpsNU9YTmZYMUJ4ZUdwRFozaEZXRXBmVHpsUlRtUlRiRFJaWWtKSmRqWndha1pJY21WQ09ITlpjRzB3ZFVSeU5IZEpRMVpIUkRSS01WOVhibGxPT1Y5bmRGUnVWWEV3ZGxCV1ZubEdNVWhUVFVab1IwVkhSSFpXVlZCeVpYZFFVbFpDU1ZVdE1sa3lXa0YwVDBNdFVWVnVVbDloZWxKNWJqVkJMbGh6WVVvd01VSXdaSGh0WDBOWlVVSmpkMW93U0ZFLnM4UHJwelBYaXpFZV9xWDMwV1NUdFFnUHNKUEtaSnN6ZUxZZkJVN3RZNzQiLCJleHAiOjE2MzEwMTExMzEsImlhdCI6MTYzMTAxMDgzMX0.ZG3beMR-VI2fwHCzCdggG8IOyRTKVJaW2pB8mB5wtv8\",\"callbacks\":[{\"type\":\"KbaCreateCallback\",\"output\":[{\"name\":\"prompt\",\"value\":\"Security Questions\"},{\"name\":\"predefinedQuestions\",\"value\":[\"What's your favorite color?\",\"Who was your first employer?\"]}],\"input\":[{\"name\":\"IDToken1question\",\"value\":\"What's your favorite color?\"},{\"name\":\"IDToken1answer\",\"value\":\"Blue\"}]},{\"type\":\"KbaCreateCallback\",\"output\":[{\"name\":\"prompt\",\"value\":\"Security Questions\"},{\"name\":\"predefinedQuestions\",\"value\":[\"What's your favorite color?\",\"Who was your first employer?\"]}],\"input\":[{\"name\":\"IDToken2question\",\"value\":\"Who was your first employer?\"},{\"name\":\"IDToken2answer\",\"value\":\"Me\"}]}],\"status\":200,\"ok\":true}"

  func testFRStart() {
    frAuth.start { _ in
      XCTAssertTrue(true)
    } rejecter: { code, message, error in
      XCTAssertTrue(false)
    }
  }

  func testDecodingRegister() {
    let decoder = JSONDecoder()
    var responseObject: Response?
    let jsonData = Data(self.exampleRegisterResponse.utf8)
    do {
      responseObject = try decoder.decode(Response.self, from: jsonData)
      XCTAssertNotNil(responseObject?.status)
      XCTAssertNotNil(responseObject?.callbacks)
      XCTAssertEqual(responseObject?.callbacks?.count, 9)
      for callback in responseObject!.callbacks! {
        XCTAssertNotNil(callback.type)
        XCTAssertNotNil(callback._id)
        XCTAssertNotNil(callback.input)
        for input in callback.input! {
          XCTAssertNotNil(input.value)
          XCTAssertNotNil(input.name)
        }
      }
    } catch  {
      print(String(describing: error))
      assertionFailure()
    }
  }

  func testDecodingLogin() {

    let decoder = JSONDecoder()
    var responseObject: Response?
    let jsonData = Data(self.exampleLoginResponse.utf8)
    do {
      responseObject = try decoder.decode(Response.self, from: jsonData)
      XCTAssertNotNil(responseObject?.authId)
      XCTAssertNotNil(responseObject?.status)
      XCTAssertNotNil(responseObject?.callbacks)
      XCTAssertEqual(responseObject?.callbacks?.count, 2)
      for callback in responseObject!.callbacks! {
        XCTAssertNotNil(callback.type)
        XCTAssertNotNil(callback._id)
        XCTAssertNotNil(callback.input)
        for input in callback.input! {
          XCTAssertNotNil(input.value)
          XCTAssertNotNil(input.name)
        }
      }
    } catch  {
      print(String(describing: error))
      assertionFailure()
    }

  }

  func testDecodingKba() {

    let decoder = JSONDecoder()
    var responseObject: Response?
    let jsonData = Data(self.exampleKBAResponse.utf8)
    do {
      responseObject = try decoder.decode(Response.self, from: jsonData)
      XCTAssertNotNil(responseObject?.authId)
      XCTAssertNotNil(responseObject?.status)
      XCTAssertNotNil(responseObject?.callbacks)
      XCTAssertEqual(responseObject?.callbacks?.count, 2)
      for callback in responseObject!.callbacks! {
        XCTAssertNotNil(callback.type)
        XCTAssertNil(callback._id)
        XCTAssertNotNil(callback.input)
        XCTAssertTrue(callback.input!.count>1)
        for input in callback.input! {
          XCTAssertNotNil(input.value)
          XCTAssertNotNil(input.name)
        }
      }
    } catch  {
      print(String(describing: error))
      assertionFailure()
    }

  }

  func testlogin() {
    let expectation = XCTestExpectation(description: "testlogin")
    self.frAuth.start { _ in
      self.frAuth.login { result in
        if let result = result as? String, let dict = result.convertToDictionary() {
          XCTAssertNotNil(dict["authId"])
          XCTAssertNotNil(dict["authServiceId"])
          XCTAssertNotNil(dict["callbacks"])
        } else {
          assertionFailure()
        }
        expectation.fulfill()
      } rejecter: { code, message, error in
        assertionFailure()
        expectation.fulfill()
      }
    } rejecter: { code, message, error in
      assertionFailure()
      expectation.fulfill()
    }

    wait(for: [expectation], timeout: 30.0)
  }

  func testFullLogin() {
    let expectation = XCTestExpectation(description: "testlogin")
    frAuth.start { _ in
      self.frAuth.logout()
      sleep(2)
      self.frAuth.login { result in
        if let result = result as? String, let dict = result.convertToDictionary() {
          XCTAssertNotNil(dict["authId"])
          XCTAssertNotNil(dict["authServiceId"])
          XCTAssertNotNil(dict["callbacks"])

          self.frAuth.next(self.exampleLoginResponse) { result in
            if let response = result as? [String: Any] {
              XCTAssertNotNil(response["sessionToken"])
              XCTAssertNotNil(response["type"])
              XCTAssertEqual(response["type"] as! String, "LoginSuccess")

              self.frAuth.getAccessToken { accessToken in
                expectation.fulfill()
              } rejecter: { code, message, error in
                expectation.fulfill()
              }

            } else if let result = result as? String, let dict = result.convertToDictionary() {
              XCTAssertNotNil(dict["authId"])
              XCTAssertNotNil(dict["authServiceId"])
              XCTAssertNotNil(dict["callbacks"])
            }
          } rejecter: { code, message, error in
            assertionFailure()
            expectation.fulfill()
          }

        } else {
          assertionFailure()
          expectation.fulfill()
        }
      } rejecter: { code, message, error in
        assertionFailure()
        expectation.fulfill()
      }
    } rejecter: { code, message, error in
      assertionFailure()
      expectation.fulfill()
    }

    wait(for: [expectation], timeout: 30.0)
  }

  func testRegister() {


    let expectation = XCTestExpectation(description: "testRegister")
    self.frAuth.start { _ in
      self.frAuth.logout()
      sleep(2)
      self.frAuth.register { result in
        if let result = result as? String, let dict = result.convertToDictionary() {
          XCTAssertNotNil(dict["authId"])
          XCTAssertNotNil(dict["authServiceId"])
          XCTAssertNotNil(dict["callbacks"])
          self.frAuth.next(self.exampleRegisterResponse) { result in
            if let response = result as? [String: Any] {
              XCTAssertNotNil(response["sessionToken"])
              XCTAssertNotNil(response["type"])
              XCTAssertEqual(response["type"] as! String, "LoginSuccess")
              expectation.fulfill()
            } else {
              assertionFailure()
              expectation.fulfill()
            }
          } rejecter: { code, message, error in
            assertionFailure()
            expectation.fulfill()
          }
        } else {
          assertionFailure()
          expectation.fulfill()
        }
      } rejecter: { code, message, error in
        assertionFailure()
        expectation.fulfill()
      }
    } rejecter: { code, message, error in
      assertionFailure()
      expectation.fulfill()
    }

    wait(for: [expectation], timeout: 30.0)

  }

  func testKBALogin() {
    let expectation = XCTestExpectation(description: "testlogin")
    self.frAuth.start { _ in
      self.frAuth.logout()
      sleep(2)
      self.frAuth.login { result in
        if let result = result as? String, let dict = result.convertToDictionary() {
          XCTAssertNotNil(dict["authId"])
          XCTAssertNotNil(dict["authServiceId"])
          XCTAssertNotNil(dict["callbacks"])

          self.frAuth.next(self.exampleLoginResponse) { result in
            if let response = result as? [String: Any] {
              XCTAssertNotNil(response["sessionToken"])
              XCTAssertNotNil(response["type"])
              XCTAssertEqual(response["type"] as! String, "LoginSuccess")
            } else if let result = result as? String, let dict = result.convertToDictionary() {
              XCTAssertNotNil(dict["authId"])
              XCTAssertNotNil(dict["authServiceId"])
              XCTAssertNotNil(dict["callbacks"])
              self.frAuth.next(self.exampleKBAResponse) { result in
                if let response = result as? [String: Any] {
                  XCTAssertNotNil(response["sessionToken"])
                  XCTAssertNotNil(response["type"])
                  XCTAssertEqual(response["type"] as! String, "LoginSuccess")
                } else {
                  assertionFailure()
                }
                expectation.fulfill()
              } rejecter: { code, message, error in
                assertionFailure()
                expectation.fulfill()
              }
            }
          } rejecter: { code, message, error in
            assertionFailure()
            expectation.fulfill()
          }

        } else {
          assertionFailure()
          expectation.fulfill()
        }
      } rejecter: { code, message, error in
        assertionFailure()
        expectation.fulfill()
      }
    } rejecter: { code, message, error in
      assertionFailure()
      expectation.fulfill()
    }

    wait(for: [expectation], timeout: 30.0)
  }

  func testUserInfo() {
    self.authenticate()
    let expectation = XCTestExpectation(description: "testUserInfo")
    sleep(2)
    frAuth.getUserInfo { result in
      XCTAssertNotNil(result)
      if let dict = result as? [String: Any] {
        print(dict)
      }
      expectation.fulfill()
    } rejecter: { code, message, error in
      assertionFailure()
      expectation.fulfill()
    }
    wait(for: [expectation], timeout: 60.0)
  }

  func testAccessToken() {
    self.authenticate()
    let expectation = XCTestExpectation(description: "testUserInfo")
    sleep(2)
    frAuth.getAccessToken { result in
      XCTAssertNotNil(result)
      if let result = result as? String, let dict = result.convertToDictionary() {
        print(dict)
      }
      expectation.fulfill()
    } rejecter: { code, message, error in
      assertionFailure()
      expectation.fulfill()
    }

    wait(for: [expectation], timeout: 60.0)
  }

  // MARK: Helper Methods
  private func authenticate() {
    self.frAuth.start { _ in
      self.frAuth.logout()
      sleep(2)
      let semaphore = DispatchSemaphore(value: 1)
      semaphore.wait()
      self.frAuth.login { result in
        if let _ = result as? String {
          self.frAuth.next(self.exampleLoginResponse) { result in
            semaphore.signal()
          } rejecter: { code, message, error in
            semaphore.signal()
          }
        } else {
          semaphore.signal()
        }
      } rejecter: { code, message, error in
        semaphore.signal()
      }
    } rejecter: { code, message, error in
      print(message)
    }
  }
}

extension String {
    func convertToDictionary() -> [String: Any]? {
        if let data = self.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }
}
