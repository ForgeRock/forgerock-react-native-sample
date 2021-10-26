# ForgeRock React Native Sample

A ForgeRock protected, sample, todo cross-platform app written with React Native with a supporting (protected) API resource server.

IMPORTANT: This is not a demonstration of React Native itself or instructional for how to build a React Native app. This is intended to demonstrate the implementation of the ForgeRock JavaScript SDK within a React Native app. There are many aspects to routing, state management, tooling and other aspects to building a React Native app that are outside of the scope of this project. For information about creating a React Native app, visit React Native's official documentation.

## Requirements

1. An instance of ForgeRock's Access Manager (AM), either within a ForgeRock's Identity Cloud tenant, your own private installation or locally installed on your computer
2. Node >= 14.2.0 (recommended: install via official package installer)
3. Knowledge of using the Terminal/Command Line
4. Ability to generate security certs (recommended: mkcert (installation instructions here)
5. This project "cloned" to your computer
6. Xcode 12

## Installation

Once you have the above requirements, we can build the project

## Security Certificates

This project requires HTTPS (secure protocol) which means security (SSL/TLS) certificates are necessary. For local development, it's common to generate your own self-signed certificates. You're free to use any method to do this, but if you need assistance we provide instructions about how to generate your own certificate for [ios](./docs/ios-certificates.md) and [android](./docs/android-certificates.md).

Once you generate the appropriate certificates, add them to your `.env.js` file in order to use the local server.

> WARNING: Self-signed certificates or certificates not from an industry-recognized, certificate authority (CA) should never be used in production

## Setup

1. Fork this repo to your own personal account
2. `git clone` from your personal fork
3. `cd forgerock-react-native-sample`
4. `cd reactnative-todo`
5. `npm install`
6. `cd ios`
7. `pod install`
8. `cd ..`
9. Create the `.env.js` file from the `.env.example.js` file

Once the above is done, start the build in Xcode using iPhone 12 or higher

### Configure CORS

1.  Allowed origins: https://react.example.com:8443
2.  Allowed methods: GET POST
3.  Allowed headers: Content-Type X-Requested-With Accept-API-Version Authorization

#### Create Your OAuth Clients

1.  Create a public (SPA) OAuth client for the web app: no secret, scopes of openid profile email, implicit consent enabled, and no "token authentication endpoint method".
2.  Create a confidential (Node.js) OAuth client for the API server: with a secret, default scope of `am-introspect-all-tokens`, and `client_secret_basic` as the "token authentication endpoint method".

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

Change the name of `.env.example.js` to `.env.js` and replace the bracketed values (e.g. `<<<helper-text>>>`) with your values.

Example with annotations

```js 
const AM_URL='https://example-am-instance.forgerock.com/am' // (include the /am)
const API_URL='https://api.example.com:9443' // (your resource API server's URL)
const JOURNEY_LOGIN='Login' // (name of journey/tree for Login)
const JOURNEY_REGISTER='Registration' // (name of journey/tree for Register)
const SEC_KEY_FILE='./myKey.key'
const SEC_CERT_FILE='./myCert.crt'
const REALM_PATH='alpha'
const REST_OAUTH_CLIENT=sample-app-server // (name of private OAuth 2.0 client/application)
const REST_OAUTH_SECRET=secret // (the secret for the private OAuth 2.0 client/application)
const WEB_OAUTH_CLIENT=example-react-app // (the name of the public OAuth 2.0 client/application)
```

### Installing Dependencies and Run Build

```sh
# Install the project dependencies
$ npm install
# Install ios dependencies
$ cd ios/
$ pod install
```

If you are running the project through Xcode or Android Suite, you can build the project there. You can also build the project in the terminal using the React Native cli.

Please see [ React Native Development Enviornment Setup ](https://reactnative.dev/docs/environment-setup) for more information.

### Update Your `/etc/hosts` File

If using a local server you'll need to update your `hosts` (`/etc/hosts` if on a Mac) to allow for domain aliases:

```sh
$ sudo vim /etc/hosts
```

```sh
# hosts file aliases
127.0.0.1 api.example.com
```

### Run the Servers

Now, run the below commands to start the processes needed for building the application and running the servers for both client and API server:

```sh
# In one terminal window, run the following:
$ npm run servers
```

Now, you should be able to go to your simulated device and use the application. This client will make requests to your AM instance, (the Authorization Server in OAuth terms), which will be running on whatever domain you set, and `https://api.example.com:9443` as the REST API for your todos (the Resource Server). Enjoy!

### React Client

To modify the client portion of this project, you'll need to be familiar with the following React patterns:

1. [Functional components and composition](https://reactjs.org/docs/components-and-props.html)
2. [Hooks (including custom hooks)](https://reactjs.org/docs/hooks-intro.html)
3. [Context API](https://reactjs.org/docs/hooks-reference.html#usecontext)
4. [React Navigation](https://reactnavigation.org/)
5. [React Native](https://reactnative.dev/)

#### Styling

We utilize Native Base for styling of both `iOS` and `Android` apps. Please see [Native Base](https://nativebase.io/) here for more information.

### REST API Server

To modify the API server, you'll need a [basic understanding of Node](https://nodejs.org/en/about/) as well as the following things:

1. [Express](https://expressjs.com/)
2. [PouchDB](https://pouchdb.com/)
3. [Superagent](https://www.npmjs.com/package/superagent)

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
