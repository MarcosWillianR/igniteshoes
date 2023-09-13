import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { Notification } from './src/components/Notification';
import { tagUserInfoCreate } from './src/notifications/notificationTags';

import { CartContextProvider } from './src/contexts/CartContext';

const oneSignalAppId = Platform.OS === 'ios' ? "IOS_APP_ID" : "ANDROID_APP_ID";
OneSignal.setAppId(oneSignalAppId);

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [notification, setNotification] = useState<OSNotification>();
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent ) => {
      const response = notificationReceivedEvent.getNotification();
      setNotification(response);
    })

    return () => unsubscribe;
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
      barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      {notification?.title && (
        <Notification title={notification.title} onClose={() => setNotification(undefined)} />
      )}
    </NativeBaseProvider>
  );
}