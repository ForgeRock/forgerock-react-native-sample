# Installing a Root Certificate on iOS

## Prerequisite

1. You may need to install `openssl`, or change the following instructions to match the tool of your choosing

2. First, you need to create a Root certificate that your computer/phone/device accepts as trusted. You use this certificate to sign the server certificate.

   In a terminal, copy and paste the following command:

   ```bash
   openssl genrsa -des3 -out myCA.key 2048
   ```

   Note: If you receive a `Error Loading extension section v3_ca` error, do the following:

   ```bash
   sudo vim /etc/ssl/openssl.cnf
   ```

   Paste the following at the bottom of your file:

   ```bash
   [ v3_ca ]
   basicConstraints = critical,CA:TRUE
   subjectKeyIdentifier = hash
   authorityKeyIdentifier = keyid:always,issuer:always
   ```

3. Add Certificate:

   - Open `keychain` application.
   - Go to `File -> Import Items`
   - Select the file (in the directory you ran the `openssl command above` or where you chose to output the file from the `openssl command`). In the command above, we named the file `myCA.pem`
   - You should see the `Common Name` that you gave your root certificate in the list
   - Select the common name from the list, and open it by double clicking.
   - Expand the `trust` section
   - Change `When using this certificate` to `Always Trust`.
   - Close the window (Enter password/fingerprint when prompted).
   - Done!

4. iOS Device/Simulator

   The easiest way that we've found is to email the certificate to yourself on the device.
   - Login to your own email on the device (i.e. through safari)
   - Email yourself the _pem_ file that you generated
   - Once you open the email containing the attached _pem_ file, you will open it, and click _Allow_
   - Go to _Settings -> General -> Profiles_ and select the imported configuration profile.
   - Click _Trust_
   - Go to _Settings -> General -> About -> Certificate Trust Settings_ and enable the toggle next to the certificate installed

Note :

```bash
Note that trusting certificates can cause damage or expose data on your device. Be extra careful when doing so and NEVER accept a profile or a certificate from a source you do not trust.
```

5. Create a signed certificate

- In a terminal, navigate to your application directory and ensure that `domain-script.sh` has run access.
  `$ chmod -775 ./domain-script.sh`
  - run `./domain-script.sh [your-domain-name]`
  - It is important that [your-domain-name] is the domain where you plan to install the certificate. For example, the local server for this application could use `api.example.com` - which includes the subdomain.
  - Fill out the form, including the password. This generates a few new files with the following format:
    [your-domain-name].(key,crt,csr,ext)
  - Add the generated certificate files as the serving SSL certificate in your server. For this app, populate the .env file with the appropriate values
    Example:

```env
SEC_KEY_FILE=<<<Your security key file name>>>
SEC_CERT_FILE=<<<Your security cert file name>>>
```
