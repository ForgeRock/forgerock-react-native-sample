# ForgeRock React Native Todo App Sample

A ForgeRock protected, sample, todo cross-platform app written with React Native with a supporting (protected) API resource server.

IMPORTANT: This is not a demonstration of React Native itself or instructional for how to build a React Native app. This is intended to demonstrate the implementation of the ForgeRock JavaScript SDK within a React Native app. There are many aspects to routing, state management, tooling and other aspects to building a React Native app that are outside of the scope of this project. For information about creating a React Native app, visit React Native's official documentation.

## Requirements

1. An instance of ForgeRock's Access Manager (AM), either within a ForgeRock's Identity Cloud tenant, your own private installation or locally installed on your computer
2. Node >= 14.2.0 (recommended: install via official package installer)
3. Knowledge of using the Terminal/Command Line
4. Ability to generate security certs
5. This project "cloned" to your computer
6. Xcode 12+

## Installation

Once you have the above requirements, we can build the project

## Setup

1. Fork this repo to your own personal account
2. `git clone` from your personal fork
3. `cd forgerock-react-native-sample`
4. `cd reactnative-todo`
5. `npm install`
6. `cd ios`
7. `pod install`
8. `cd ..`
9. Create the `.env.js` file from the `.env.js.example` file

Once the above is done, start the build in Xcode using iPhone 12 or higher

### Create Your OAuth Clients

1. Create a public (native) OAuth client for the mobile app: no secret, scopes of openid profile email, implicit consent enabled, and no "token authentication endpoint method".
2. Create a confidential (Node.js) OAuth client for the API server: with a secret, default scope of `am-introspect-all-tokens`, and `client_secret_basic` as the "token authentication endpoint method".

### Create your Authentication Journeys/Trees

1. Login
2. Register

Note: The sample app currently supports the following callbacks only:

- NameCallback
- PasswordCallback
- ChoiceCallback
- ValidatedCreateUsernameCallback
- ValidatedCreatePasswordCallback
- StringAttributeInputCallback
- BooleanAttributeInputCallback
- KbaCreateCallback
- TermsAndConditionsCallback

### Configure Your `.env.js` File

To configure the React Native layer and the local Node.js API server, you'll need an environment file. To do this, change the name of `.env.js.template` to `.env.js` and add the relevant values for your setup.

Example with annotations:

```js
const AM_URL = 'https://example-am-instance.forgerock.com/am'; // (include the /am)
const API_PORT = 8080; // (your resource API server's PORT)
const API_BASE_URL = 'http://localhost'; // (your resource API server's Base URL)
const REALM_PATH = 'alpha'; // (AM realm; if using Identity Cloud, likely "alpha"; if not, likely "root")
const REST_OAUTH_CLIENT = RestOAuthClient; // (name of private OAuth 2.0 client/application)
const REST_OAUTH_SECRET = sf0h8e350efhd932; // (the secret for the private OAuth 2.0 client/application)
```

Note: Avoid trailing slashes in the URL string values of the config.

### Configure your iOS `FRAuthConfig.plist`

Within Xcode, create a properties file called `FRAuthConfig.plist` within the `ios/reactnativetodo/` directory by copying the raw values from `FRAuthConfig.plist.template`. Add the relevant values for your setup.

Example with annotations:

```xml
<dict>
  <key>forgerock_cookie_name</key>
  <string>a1baeb394ea5300</string>
  <key>forgerock_enable_cookie</key>
  <true/>
  <key>forgerock_oauth_client_id</key>
  <string>MobileOAuthClient</string>
  <key>forgerock_oauth_redirect_uri</key>
  <string>frauth://org.reactjs.native.example.reactnativetodo</string>
  <key>forgerock_oauth_scope</key>
  <string>openid profile email address</string>
  <key>forgerock_oauth_url</key>
  <string>https://example-am-instance.forgerock.com/am</string>
  <key>forgerock_oauth_threshold</key>
  <string>60</string>
  <key>forgerock_url</key>
  <string>https://example-am-instance.forgerock.com/am</string>
  <key>forgerock_realm</key>
  <string>alpha</string>
  <key>forgerock_timeout</key>
  <string>60</string>
  <key>forgerock_keychain_access_group</key>
  <string>org.reactjs.native.example.reactnativetodo</string>
  <key>forgerock_auth_service_name</key>
  <string>Login</string>
  <key>forgerock_registration_service_name</key>
  <string>Registration</string>
</dict>
```

### Configure your Android `strings.xml`

Change the name of `strings.xml.template` found within `android/app/src/main/res/values/` to `strings.xml` and add the relevant values for your setup.

Example with annotations:

```xml
<resources>
    <string name="app_name">reactnativetodo</string>
    <!-- OAuth 2.0 Client Details -->
    <string name="forgerock_oauth_client_id" translatable="false">reactNativeClientAndroid</string>
    <string name="forgerock_oauth_redirect_uri" translatable="false">org.forgerock.demo:/oauth2redirect</string>
    <string name="forgerock_oauth_scope" translatable="false">openid profile email</string>
    <integer name="forgerock_oauth_threshold" translatable="false">60</integer>

    <!-- AM Instance Details -->
    <string name="forgerock_url" translatable="false">https://example-am-instance.forgerock.com/am</string>
    <string name="forgerock_cookie_name" translatable="false">a1baeb394ea5300</string>
    <string name="forgerock_realm" translatable="false">alpha</string>
    <integer name="forgerock_timeout" translatable="false">60</integer>

    <!-- AM Tree Details -->
    <string name="forgerock_auth_service" translatable="false">Login</string>
</resources>
```

### Installing Dependencies and Run Build

```sh
# Install the project dependencies
npm install
# Install ios dependencies
cd ios/
pod install
cd ..
```

If you are running the project through Xcode or Android Suite, you can build the project there. You can also build the project in the terminal using the React Native cli.

Please see [React Native Development Environment Setup](https://reactnative.dev/docs/environment-setup) for more information.

### Run the Server

Now, run the below command to start the Node.js API server for server the todo endpoints.

```sh
npm run server
```

Now, you should be able to go to your simulated device and use the application. This client will make requests to your AM instance, (the Authorization Server in OAuth terms), which will be running on whatever domain you set, and `http://localhost:8080` as the REST API for your todos (the Resource Server).

You can test this server by visiting its "health check" endpoint (using `curl` or a browser): `http://localhost:8080/healthcheck`. If you get a `200` "OK", your API server is running.

### Run the React Native application

To run the application in an iOS Simulator, open up the `ios/reactnativetodo/reactnativetodo.workspace` in Xcode to build and run the code against an iPhone target of 11 or higher.

To run the application in an Android Emulator, open the `android/` directory in Android Studio and run the build command.

## Debugging in iOS

There is currently a bug in React Native as of 0.66 that causes random bugs when using the Chrome Remote Debugger with the iOS Simulator. You can see the issue in the following Github tickets:

1. https://github.com/react-native-community/cli/issues/1081
2. https://github.com/facebook/react-native/issues/28531

A change has been made to the AppDelegate file to support Safari's debugger which does not result in the same buggy behavior. We recommend you open Safari, click on the "Debugger" menu item, select the Simulator you are using and then click the "JSContext" item. We also recommend enabling "Automatically Show Web Inspector for JSContexts". This will ensure a new inspector is opened when the app is reloaded (just close the old inactive one).

For more information on debugging [see the React Native page about debugging](https://reactnative.dev/docs/debugging).

## Development

## The Tech Stack

1. ForgeRock's [Native Android](https://github.com/ForgeRock/forgerock-android-sdk) and [iOS SDK](https://github.com/ForgeRock/forgerock-ios-sdk)
2. Sample bridge code for each platform
3. [React Native](https://reactnative.dev/) for building the UI
4. [React Navigation](https://reactnavigation.org/) for routing between screens
5. [NativeBase](https://nativebase.io/) for theming and styling the UI
6. [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

### React Client

To modify the client portion of this project, you'll need to be familiar with the following React patterns:

1. [Functional components and composition](https://reactjs.org/docs/components-and-props.html)
2. [Hooks (including custom hooks)](https://reactjs.org/docs/hooks-intro.html)
3. [Context API](https://reactjs.org/docs/hooks-reference.html#usecontext)
4. [React Navigation](https://reactnavigation.org/)
5. [React Native](https://reactnative.dev/)

### Styling

We utilize Native Base for styling of both `iOS` and `Android` apps. Please see [Native Base](https://nativebase.io/) here for more information.

### REST API Server

To modify the API server, you'll need a [basic understanding of Node](https://nodejs.org/en/about/) as well as the following things:

1. [Express](https://expressjs.com/)
2. [PouchDB](https://pouchdb.com/)
3. [Superagent](https://www.npmjs.com/package/superagent)

## The Tech Stack

1. ForgeRock's [Native Android](https://github.com/ForgeRock/forgerock-android-sdk) and [iOS SDK](https://github.com/ForgeRock/forgerock-ios-sdk)
2. Sample bridge code for each platform
3. [React Native](https://reactnative.dev/) for building the UI
4. [React Navigation](https://reactnavigation.org/) for routing between screens
5. [NativeBase](https://nativebase.io/) for theming and styling the UI

## TypeScript?

The ForgeRock Javascript SDK is developed with TypeScript, so type definitions are available. This sample application does not utilize TypeScript, but if you'd like to see a version of this written in TypeScript, let us know.

## General Troubleshooting

1. Make sure `libFRAuth.a` is added to your Target's "Frameworks, Libraries, and Embedded Content"
2. Make sure you have a `.env.js` file with valid values.
3. Make sure the Metro server is running; `npx react-native start` if you want to run it manually
4. Bridge code as been altered, so be aware of name changes
5. If you get this error:

  `[!] CocoaPods could not find compatible versions for pod "FRAuth":`

  run `pod repo update` and then `pod install`.

6. If the iOS app acts buggy, try each of the below; move to the next one if issue continues:

    1. Restart the app and Metro
    2. Didn't work? Using Xcode, clean the build folder and rebuild/rerun the app
    3. If that doesn't work, remove the the following: `node_modules`, `package-lock.json`, `ios/Pods`, `ios/Podfile.lock` and then reinstall dependencies with `npm i` and `pod install`
    4. If still having issues, within the simulator, click the Home button and long press the React Native application to remove it; restart from Xcode.
