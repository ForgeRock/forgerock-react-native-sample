# ForgeRock React Native Sample

ForgeRock protected native/hybrid application using React Native and the ForgeRock SDKs

## Setup

1. Fork this repo to your own personal account
2. `git clone` from your personal fork
3. `cd forgerock-react-native-sample`
4. `cd reactnative-todo`
5. `npm install`
6. `cd ios`
7. `pod install`
8. `cd ..`
9. `npx react-native link`
10. Create the `.env` file from the `.env.example` file

Once the above is done, start the build in Xcode using iPhone 12 or higher

## Troubleshooting

1. Make sure `libFRAuth.a` is added to your Target's "Frameworks, Libraries, and Embedded Content"
2. Make sure you have a `.env` file with valid values
3. Make sure the Metro server is running; `npx react-native start` if you want to run it manually
4. Bridge code as been altered, so be aware of name changes
