import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerComponent from './CustomDrawerComponent';
import CategoriesScreen from './assets/screens/CategoriesScreen';
import SettingsScreen from './assets/screens/SettingsScreen';
import HomeScreen from './assets/screens/HomeScreen';
import FeedbackScreen from './assets/screens/FeedbackScreen';
import SearchScreen from './assets/screens/SearchScreen';


const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      screenOptions={{
        headerTitleAlign: 'center', 
        headerStyle: {
          backgroundColor: '#fefbe9', 
          borderColor: '4e342e',
          borderBottomWidth: 3,
          borderBottomColor: '#4e342e',
        },
        headerTintColor: '#4e342e',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25
        },
      }}
    >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Search" component={SearchScreen} />
          <Drawer.Screen name="Categories" component={CategoriesScreen} />
          <Drawer.Screen name="Feedback" component={FeedbackScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>

    </NavigationContainer>
  );
};

<>
</>
export default App;
