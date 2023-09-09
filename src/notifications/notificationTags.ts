import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'John Doe',
    'user_email': 'john_doe@mail.com'
  })
}