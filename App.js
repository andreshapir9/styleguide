import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CameraView from './components/cameraView'
import RecommendationView from './components/recommendationView'
import MainView from './components/mainView'
import ColorPickerView from './components/ColorPickerView';
import appcolors from './config/appcolors';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Popular') {
              iconName = focused ? 'pricetags' : 'pricetags-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'ColorPick') {
              iconName = focused ? 'ios-color-filter' : 'ios-color-filter-outline';
            } else if (route.name === 'Recommendations') {
              iconName = focused ? 'contrast' : 'contrast-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: appcolors.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={MainView} />
        <Tab.Screen name="Popular" component={ColorPickerView} />
        <Tab.Screen name="Camera" component={CameraView} />
        <Tab.Screen name="ColorPick" component={ColorPickerView} />
        <Tab.Screen name="Recommendations" component={RecommendationView} />
        {/* <Tab.Screen name="TouchSel" component={TouchSelect} /> */}
      </Tab.Navigator>
    </NavigationContainer >
  )
}

export default App