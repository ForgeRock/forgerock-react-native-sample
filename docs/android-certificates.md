# Android Certificate Generation

In Android we must follow similar steps to `iOS` in order to add the RootCA to the emulator and trust it. Furthermore, the emulator has a separate hosts file, so this would need to be edited if the scope of AM or IG is running on your machines localhost.

To learn about generating a [root certificate](./ios-certificates), see the `iOS` readme.

## Edit Hosts file

Make sure that you install a compatible emulator on your machine. To edit the Hosts file and transfer certificates to the device, you must mount the emulator filesystem through adb. Not all emulators are compatible. In this example, we use the "Pixel_3_XL_API_28" emulator. 

On a terminal window, run the following commands:

```bash
emulator -avd Pixel_3_XL_API_28 -writable-system
adb root
adb remount
adb pull /system/etc/hosts
```

Edit the hosts file and the details for your domain. You want access from the Android Emulator. The following is an example hosts file:

```bash
127.0.0.1       localhost
::1             ip6-localhost
10.0.2.2     openam.example.com
10.0.2.2     sdkapp.example.com
10.0.2.2     openig.example.com
```

Note: 10.0.2.2 refers to the Localhost address of the Host machine.

When ready, save the file and push it to the emulator using the following command:

```bash
adb push ./hosts /etc/hosts
```

In the emulator, open a web browser and test the configuration. While accessing the AM instance running on your mac, you will probably face a certificate error. This is normal because the Android system does not yet turn your custom CA. To enable certificate trust, we upload the CA cert in the emulator and install it.

## Install the CA cert

In the same terminal window, run the following command:

```bash
adb push [path to cert]/myCA.pem /sdcard/myCA.pem
```

Next, open the Settings App in the emulator and go to _Settings -> Security & Location -> Advanced -> Encryption & credentials -> Install from SD card_.

Tap on the myCA.pem file. You will be asked to add the Device PIN and input a name for the certificate.

After doing so, test the website again. This time, you should see that the website is signed with a trusted certificate.

## Update project with Network Configuration

In your Android project, allow use of user trusted CAs for network calls. Under the 'Res/xml' folder, create a new file named "network_security_config.xml".

In the file, add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

Open the AndroidManifest file, and point the `<Application>` to this configuration. For example:

```xml
<application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:networkSecurityConfig="@xml/network_security_config">
```

Restart the app and attempt to connect to your local instance of AM or IG. The connection should not be `trusted`.
