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
9. Create the `.env` file from the `.env.example` file

Once the above is done, start the build in Xcode using iPhone 12 or higher

## Installing a Root Certificate on IOS

### Prerequisite

1. You may need to install `openssl`, or change the following instructions to match the tool of your choosing

1. First, you need to create a Root certificate that your computer/phone/device accepts as trusted. You use this certificate to sign the server certificate.

   In a terminal, copy and paste the following command:

   ```bash
     openssl genrsa -des3 -out myCA.key 2048
   ```

   Note: If you receive a `Error Loading extension section v3_ca` error, do the following:

   ```bash
     sudo vim /etc/ssl/openssl.cnf
   ```

   Paste the following at the bottom of your file

   ```bash
     [ v3_ca ]
     basicConstraints = critical,CA:TRUE
     subjectKeyIdentifier = hash
     authorityKeyIdentifier = keyid:always,issuer:always
   ```

1. Add Certificate:

   - Open `keychain` application.
   - Go to `File -> Import Items`
   - Select the file (in the directory you ran the `openssl command above` or where you chose to output the file from the `openssl command`). In the command above, we named the file `myCA.pem`
   - You should see the `Common Name` that you gave your root certificate in the list
   - Select the common name from the list, and open it by double clicking.
   - Expand the `trust` section
   - Change `When using this certificate` to `Always Trust`.
   - Close the window (Enter password/fingerprint when prompted).
   - Done!

1. iOS Device/Simulator
   The easiest way that we've found is to email the certificate to yourself on the device.
   - Login to your own email on the device (i.e. through safari)
   - Email yourself the `pem` file that you generated
   - Once you opene the email containing the attached `pem` file, you will open it, and click `Allow`
   - Go to `Settings -> General -> Profiles` and select the imported configuration profile.
   - Click `Trust`
   - Go to `Settings -> General -> About -> Certificate Turst Settings` and enable the toggle next to the certificate installed

Note :

```bash
Note that trusting certificates can cause damage or expose data on your device. Be extra careful when doing so and NEVER accept a profile or a certificate from a source you do not trust.
```

1. Create a signed certificate

- In a terminal, navigate to your application directory and ensure that `domainScript.sh` has run access.
  `$ chmod -775 ./domainScript.sh`
  - run `./domainScript.sh [your-domain-name]`
  - It is important that [your-domain-name] is the domain where you plan to install the certificate. For example, the local server for this application could use `api.example.com` - which includes the subdomain.
  - Fill out the form, including the password. This generates a few new files with the following fomat:
    [your-domain-name].(key,crt,csr,ext)
  - Add the generated certificate files as the serving SSL certificate in your server. For this app, populate the .env file with the appropriate values
    Example:

````
   SEC_KEY_FILE=<<<Your security key file name>>>
   SEC_CERT_FILE=<<<Your security cert file name>>>
 ```


## General Troubleshooting

1. Make sure `libFRAuth.a` is added to your Target's "Frameworks, Libraries, and Embedded Content".
2. Make sure you have a `.env` file with valid values.
3. Make sure the Metro server is running; `npx react-native start` if you want to run it manually.
4. Bridge code as been altered, so be aware of name changes.
5. If you get this error:

 ```
   [!] CocoaPods could not find compatible versions for pod "FRAuth":
 ```

 run `pod repo update` and then `pod install`.
````
