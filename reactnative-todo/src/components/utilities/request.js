import { NativeModules } from 'react-native';
import { API_URL } from 'react-native-dotenv';

const { FRAuthBridge } = NativeModules;

async function request(method, resource = '', body = null) {
  console.log('API URL' + API_URL);
  const json = await FRAuthBridge.getAccessToken();
  const tokens = JSON.parse(json);
  const { tokenType, value } = tokens;
  try {
    const res = await fetch(`${API_URL}todos/${resource}`, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: `${tokenType} ${value}`,
      },
    });
    if (method === 'DELETE') return;

    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

export { request };
