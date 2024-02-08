import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Tabs,
  Likes,
  Payment,
  FavoriteHotels,
  Settings,
  Bookings,
  ProfileSetting,
  BookingScreenHotel,
  ConfirmationScreen,
  DetailsScreen
} from './src/screens';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    // Render a message or component indicating no internet connection
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No internet connection. Please check your network settings.</Text>
      </View>
    );
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Likes" component={Likes} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="FavoriteHotels" component={FavoriteHotels} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Bookings" component={Bookings} />
          <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
          <Stack.Screen name="BookingScreenHotel" component={BookingScreenHotel} />
          <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
