import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDropdown from './assets/screens/HomeScreen/CustomDropdown'; 
import HomeScreen from './assets/screens/HomeScreen/HomeScreen';
import CategoriesScreen from './assets/screens/CategoriesScreen';
import SettingsScreen from './assets/screens/SettingsScreen';
import FeedbackScreen from './assets/screens/FeedbackScreen';
import SearchScreen from './assets/screens/SearchScreen';
import CustomDrawerComponent from './CustomDrawerComponent';

const Drawer = createDrawerNavigator();

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerComponent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#ffb300',
          drawerInactiveTintColor: '#4e342e',
          drawerStyle: { backgroundColor: '#fefbe9' },
          drawerLabelStyle: { fontSize: 15, textAlign: 'center' },
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#fefbe9',
            borderBottomWidth: 3,
            borderBottomColor: '#4e342e',
          },
          headerTintColor: '#4e342e',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <CustomDropdown
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            ),
          }}
        />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Feedback" component={FeedbackScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
