import React, { Component, useEffect, useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './assets/screens/HomeScreen';
import ViewScreen from './assets/screens/ViewScreen';
import CreateScreen from './assets/screens/CreateScreen';
import EditScreen from './assets/screens/EditScreen';
import ReportScreen from './assets/screens/ReportScreen';
import CustomDrawerComponent from './assets/components/CustomDrawerComponent';
import SettingsScreen from './assets/screens/SettingsScreen';
import CategoriesStackNavigator from './assets/screens/CategoriesScreen/CategoriesStackNavigator';
import FeedbackScreen from './assets/screens/FeedbackScreen';
import CalculatorScreen from './assets/screens/CalculatorScreen';
import ExchangeRateScreen from './assets/screens/ExchangeRateScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for screens related to HomeScreen
function HomeStack({ navigation }) {
  
  
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewScreen"
          component={ViewScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffb300',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
            headerTitleAlign: 'center',
            headerTitle: "Details",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="#000"
                  style={{ marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="CreateScreen"
          component={CreateScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffb300',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="#000"
                  style={{ marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffb300',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
            headerTitle: 'Edit',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="#000"
                  style={{ marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>

      
    </>
  );
}

// Drawer Navigator with updated screens
const MainApp = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerComponent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#fff', // Color for the active item
          drawerInactiveTintColor: '#4e342e', // Color for inactive items
          drawerStyle: { backgroundColor: '#ffb300' }, // Set drawer background color
          drawerLabelStyle: { fontSize: 15, textAlign: 'center' },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ffb300', // Header background color
          },
          headerTintColor: '#4e342e', // Header text color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Report" component={ReportScreen} />
        <Drawer.Screen name="Categories" component={CategoriesStackNavigator} options={{ headerShown: false }}/>
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen 
          name="Feedback" 
          component={FeedbackScreen}
          />
        <Drawer.Screen name="Calculator" component={CalculatorScreen} />
        <Drawer.Screen 
          name="ExchangeRate" 
          component={ExchangeRateScreen} 
          options={{headerTitle: 'Currency Rates'}}
          />
          
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default class App extends Component {
  state = {
    passcodeIsEnabled: false,
    passcodeModalVisible: false,
    enteredPasscode: '',
  };

  async componentDidMount() {
    await this.checkPasscodeStatus();
  }

  checkPasscodeStatus = async () => {
    const savedPasscode = await AsyncStorage.getItem('appPasscode');
    if (savedPasscode) {
      this.setState({ passcodeIsEnabled: true, passcodeModalVisible: true });
    } else {
      this.setState({ passcodeIsEnabled: false, passcodeModalVisible: false });
    }
  };

  handlePasscodeSubmit = async () => {
    const { enteredPasscode } = this.state;
    const savedPasscode = await AsyncStorage.getItem('appPasscode');
    if (enteredPasscode === savedPasscode) {
      this.setState({ passcodeModalVisible: false, enteredPasscode: '' });
    } else {
      Alert.alert('Error', 'Incorrect Passcode');
    }
  };

  render() {
    const { passcodeIsEnabled, passcodeModalVisible, enteredPasscode } = this.state;
    
    return (
      <View style={styles.container}>
        <MainApp />
        {passcodeIsEnabled && (
          <Modal
            animationType="fade"
            transparent={false}
            visible={passcodeModalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalBackground}>
              <View style={styles.passcodeModalContainer}>
                <Text style={styles.modalTitle}>Enter Passcode</Text>
                <TextInput
                  style={styles.passcodeInput}
                  value={enteredPasscode}
                  onChangeText={(text) => this.setState({ enteredPasscode: text })}
                  keyboardType="numeric"
                  secureTextEntry
                />
                <TouchableOpacity style={styles.passcodeSubmitButton} onPress={this.handlePasscodeSubmit}>
                  <Text style={styles.passcodeSubmitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateButton: {
    backgroundColor: '#fefbe9', // Background color
    paddingVertical: 8, // Vertical padding
    paddingHorizontal: 12, // Horizontal padding
    borderRadius: 5, // Border radius
    flexDirection: 'row',
    alignItems: 'center', // Align items to center vertically
    justifyContent: 'center', // Center content horizontally
  },
  dateButtonText: {
    color: '#4e342e', // Text color
    fontSize: 16,
    fontWeight: 'regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passcodeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#4e342e',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  passcodeSubmitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#4e342e',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  passcodeModalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  passcodeSubmitButton: {
    backgroundColor: '#ffb300', 
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
});
