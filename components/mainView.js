/**
 * mainView.js
 * 
 * Home screen of the app, what the app enters after startup and on back from other tabs.
 * 
 */
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function MainView({ navigation }) {

  return (
    <View style={styles.container}>
      <text>
        Hello!
      </text>
    </View>
  )
}