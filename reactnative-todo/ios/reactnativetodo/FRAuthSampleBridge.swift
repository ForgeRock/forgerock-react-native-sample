/**
 * FRAuthSampleBridge.m
 * reactnativetodo
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Foundation
import FRAuth
import FRCore

/**
 * A Swift module as a sample bridge implementation for providing a middle-layer
 * connecting the ForgeRock iOS SDK with the React Native layer.
 *
 * Types (structs & enums) for the below code are located in `FRAuthSampleTypes.swift`
 */

@objc(FRAuthSampleBridge)
public class FRAuthSampleBridge: NSObject {
  var currentNode: Node?

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  /**
   * Method for calling the `getUserInfo` to retrieve the user information from the OIDC endpoint
   */
  @objc func getUserInfo(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {

    /** *************************************************************************
     * SDK INTEGRATION POINT
     * Summary: Confirm an authenticated user exists
     * --------------------------------------------------------------------------
     * Details: This method returns a local user object from the SDK.
     ************************************************************************* */
    guard let user = FRUser.currentUser else {
      /**
       * If no currently, authenticated user is found, log error and return
       */
      let errorMsg = "Invalid SDK state: No current user for which to request user info"
      FRLog.e(errorMsg)
      reject("error", errorMsg, nil)
      return
    }

    /** *************************************************************************
     * SDK INTEGRATION POINT
     * Summary: Request current user information
     * --------------------------------------------------------------------------
     * Details: This method calls the standard OIDC endpoint `/userinfo`. The
     * endpoint will return the claims associated with the scopes granted when
     * the access token was requested.
     ************************************************************************* */
    user.getUserInfo { (userInfo, error) in
      if let error = error {
        FRLog.e(String(describing: error))
        reject("error", error.localizedDescription, error)
      }
      else if let userInfo = userInfo {
        FRLog.i(userInfo.debugDescription)
        resolve(userInfo.userInfo)
      }
      else {
        let errorMsg = "Invalid SDK state: userInfo returned no result"
        FRLog.e(errorMsg)
        reject("error", errorMsg, nil)
      }
    }
  }

  /**
   * Private method for preparing a node returned from the iOS SDK for the React Native layer.
   * This serializes the node in a way that allows the use of `FRStep` from the ForgeRock JavaScript SDK,
   * which adds better "ergonomics" within the JavaScript layer of React Native.
   */
  private func handleNode(
    _ result: Any?,
    _ node: Node?,
    _ error: Error?,
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {

    if let node = node {
      self.currentNode = node
      let frNode = FRNode(node: node)
      do {
        resolve(try frNode.resolve())
      }
      catch {
        reject("Error", "Serialization of node failed", error)
      }
    } else {
      if let error = error {
        FRLog.e(String(describing: error))
        reject("Error", error.localizedDescription, error)
      } else {
        let errorMsg = "Unknown node handling failure";
        FRLog.e(errorMsg)
        reject("Error", errorMsg, nil)
      }
    }
  }
}
