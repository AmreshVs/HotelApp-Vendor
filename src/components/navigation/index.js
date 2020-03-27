import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../../screen/login/index';
import Main from '../../screen/Main/index';
import HomeScreen from '../../screen/home/index';
import BookingsScreen from '../../screen/bookings/index';
import UserProfileScreen from '../../screen/userProfile/index';
import BottomNav from '../navigation/bottomNavigation';
import BookingDetails from '../../screen/bookings/bookingDetails';
import AgentsScreen from '../../screen/agents/index';
import NotificationsScreen from '../../screen/notifications/index';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

const TabNavigation = createBottomTabNavigator(
  {
    Home: HomeScreen,
    AgentsScreen: AgentsScreen,
    NotificationsScreen: NotificationsScreen,
    BookingsScreen: BookingsScreen,
    UserProfileScreen: UserProfileScreen
  },
  {
    unmountInactiveRoutes: true,
    tabBarComponent: BottomNav,
    resetOnBlur: true,
  }
);

const rootStack = createAnimatedSwitchNavigator(
  {
    Main: Main,
    LoginScreen: LoginScreen,
    Home: TabNavigation,
    BookingDetails: BookingDetails,
  },
  {
    headerMode: 'none',
    backBehavior: 'history',
    transition: (
      <Transition.Together>
        <Transition.Out
          propagation="top"
          type="scale"
          durationMs={100}
          interpolation="easeOut"
        />
        <Transition.In type="scale" durationMs={300} />
      </Transition.Together>
    ),
  },
);

export const TabNavigator = createAppContainer(rootStack);