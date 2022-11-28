import React from 'react';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { type CompositeScreenProps } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import SettingsScreen from './SettingsScreen';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RootStackRoutes.SignIn}>
      <Stack.Screen
        options={{ headerShown: true }}
        component={AuthScreen}
        name={RootStackRoutes.SignIn}
      />
      <Stack.Screen component={TabNavigator} name={RootStackRoutes.Main} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ tabBarIcon: HomeTabIcon, tabBarTestID: 'homeTab' }}
        component={HomeScreen}
        name={MainTabRoutes.Home}
      />
      <Tab.Screen
        options={{ tabBarIcon: SettingsTabIcon, tabBarTestID: 'settingsTab' }}
        component={SettingsScreen}
        name={MainTabRoutes.Settings}
      />
    </Tab.Navigator>
  );
}

function HomeTabIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Image source={require('../assets/mobile-tab-home-selected.png')} />
  ) : (
    <Image source={require('../assets/mobile-tab-home-default.png')} />
  );
}

function SettingsTabIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Image source={require('../assets/mobile-tab-settings-selected.png')} />
  ) : (
    <Image source={require('../assets/mobile-tab-settings-default.png')} />
  );
}

type RootStackParamList = {
  [RootStackRoutes.SignIn]: undefined;
  [RootStackRoutes.Main]: undefined;
};

type MainTabsParamList = {
  [MainTabRoutes.Home]: undefined;
  [MainTabRoutes.Settings]: undefined;
};

export const enum RootStackRoutes {
  SignIn = 'Sign In',
  Main = 'Main',
}

export const enum MainTabRoutes {
  Home = 'Home',
  Settings = 'Settings',
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type MainTabScreenProps<Screen extends keyof MainTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
