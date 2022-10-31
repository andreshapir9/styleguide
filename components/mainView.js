/**
 * mainView.js
 * 
 * Home screen of the app, what the app enters after startup and on back from other tabs.
 * 
 */
import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function MainView({ navigation }) {

  return (
    <View>
      <Text style={styles.text}>Style Guide
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#121212'
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '10%'
  },
  text: {
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    marginLeft: '40%'
  }
});