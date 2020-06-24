import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screen/login';
import Main from '../../screen/Main';
import HomeScreen from '../../screen/home';
import BookingsScreen from '../../screen/bookings';
import UserProfileScreen from '../../screen/userProfile';
import BottomNav from '../navigation/bottomNavigation';
import BookingDetails from '../../screen/bookings/bookingDetails';
import AgentsScreen from '../../screen/agents';
import NotificationsScreen from '../../screen/notifications';
import DashBookingScreen from '../../screen/dashBookings';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNav {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AgentsScreen" component={AgentsScreen} />
      <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Tab.Screen name="BookingsScreen" component={BookingsScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

const TabNavigator = () => {
  return (  
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="DashBookingScreen" component={DashBookingScreen} />
    </Stack.Navigator>
  )
}

export default TabNavigator;