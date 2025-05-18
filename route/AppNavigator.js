import {Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Reels from '../screens/Reels';
import WishList from '../screens/WishList';
import Walllet from '../screens/Walllet';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: ({focused, color}) => (
          <Text
            style={{
              color,
              fontSize: focused ? 16 : 12,
              fontWeight: focused ? '800' : '400',
              paddingBottom: focused ? 6 : 0,
            }}>
            {route.name}
          </Text>
        ),
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Wallet" component={Walllet} />
      <Tab.Screen name="WishList" component={WishList} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
