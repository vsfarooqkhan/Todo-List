import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from './HomePage'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
  },
});

export default createAppContainer(AppNavigator);