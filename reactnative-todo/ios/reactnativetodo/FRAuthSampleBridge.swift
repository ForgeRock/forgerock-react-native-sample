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

  @objc func start(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {

    /**
     * Set log level according to  all
     */
    FRLog.setLogLevel([.all])

    do {
      try FRAuth.start()
      let initMessage = "SDK is initialized"
      FRLog.i(initMessage)
      resolve(initMessage)
    } catch {
      FRLog.e(error.localizedDescription)
      reject("Error", "SDK Failed to initialize", error)
    }
  }

  @objc func login(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {

    FRUser.login { (user, node, error) in
      self.handleNode(user, node, error, resolve: resolve, rejecter: reject)
    }
  }

  @objc func next(
    _ response: String,
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {

    let decoder = JSONDecoder()
    let jsonData = Data(response.utf8)
    if let node = self.currentNode {
      var responseObject: Response?
      do {
        responseObject = try decoder.decode(Response.self, from: jsonData)
      } catch  {
        FRLog.e(String(describing: error))
        reject("Error", "UnknownError", error)
      }

      let callbacksArray = responseObject!.callbacks ?? []

      for (outerIndex, nodeCallback) in node.callbacks.enumerated() {
        if let thisCallback = nodeCallback as? SingleValueCallback {
          for (innerIndex, rawCallback) in callbacksArray.enumerated() {
            if let inputsArray = rawCallback.input, outerIndex == innerIndex,
              let value = inputsArray.first?.value {

              thisCallback.setValue(value.value as! String)
            }
          }
        }
      }

      node.next(completion: { (user: FRUser?, node, error) in
        if let node = node {
          self.handleNode(user, node, error, resolve: resolve, rejecter: reject)
        } else {
          if let error = error {
            FRLog.e(String(describing: error))
            reject("Error", "LoginFailure", error)
            return
          }

          let encoder = JSONEncoder()
          encoder.outputFormatting = .prettyPrinted
          if let user = user,
            let token = user.token,
            let data = try? encoder.encode(token),
            let accessInfo = String(data: data, encoding: .utf8) {

            resolve(["type": "LoginSuccess", "accessInfo": accessInfo])
          } else {
            resolve(["type": "LoginSuccess", "accessInfo": ""])
          }
        }
      })
    } else {
      reject("Error", "UnknownError", nil)
    }
  }

  @objc func logout() {
    FRUser.currentUser?.logout()
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
