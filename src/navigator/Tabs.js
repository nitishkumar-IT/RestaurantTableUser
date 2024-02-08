import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from '../screens/TabScreen/HomeScreen/Home';
import More from '../screens/TabScreen/More';
import Bookings from '../screens/TabScreen/Bookings';

//Screen names
const homeName = "Home";
const detailsName = "More";
const bookingName = "Bookings";

const Tab = createBottomTabNavigator();
function Tabs() {
  
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route }) => ({tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } else if (rn === bookingName) {
              iconName = focused ? 'basket' : 'basket-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color="#6F5060" />;
          },
        })}>

        <Tab.Screen name={homeName} component={Home} options={{ headerShown: false }}/>
        <Tab.Screen name={bookingName} component={Bookings} options={{ headerShown: false }} />
        <Tab.Screen name={detailsName} component={More} options={{ headerShown: false }} />

      </Tab.Navigator>
  );
}

export default Tabs;