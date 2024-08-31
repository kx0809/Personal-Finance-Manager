import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDropdown from './assets/screens/HomeScreen/CustomDropdown';
import HomeScreen from './assets/screens/HomeScreen/HomeScreen';
import CategoriesScreen from './assets/screens/CategoriesScreen/CategoriesScreen';
import SettingsScreen from './assets/screens/SettingsScreen';
import FeedbackScreen from './assets/screens/FeedbackScreen';
import SearchScreen from './assets/screens/SearchScreen';
import ReportScreen from './assets/screens/ReportScreen';
import ExpenditureScreen from './assets/screens/HomeScreen/ExpenditureScreen';
import CustomDrawerComponent from './assets/components/CustomDrawerComponent';

const Drawer = createDrawerNavigator();

const MainApp = () => {
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
        <Drawer.Screen name="Report" component={ReportScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Feedback" component={FeedbackScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen
          name="Expenditure"
          component={ExpenditureScreen}
          options={{
            swipeEnabled: false,
            drawerLabel: () => null,
            title: null,
            drawerLockMode: 'locked-closed',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [passcodeIsEnabled, setPasscodeIsEnabled] = useState<boolean>(false);
  const [passcodeModalVisible, setPasscodeModalVisible] = useState<boolean>(false);
  const [enteredPasscode, setEnteredPasscode] = useState<string>('');

  useEffect(() => {
    checkPasscodeStatus();
  }, []);

  const checkPasscodeStatus = async () => {
    const savedPasscode = await AsyncStorage.getItem('appPasscode');
    if (savedPasscode) {
      setPasscodeIsEnabled(true);
      setPasscodeModalVisible(true); // Show modal if passcode is enabled
    } else {
      setPasscodeIsEnabled(false);
      setPasscodeModalVisible(false); // Hide modal if passcode is not enabled
    }
  };

  const handlePasscodeSubmit = async () => {
    const savedPasscode = await AsyncStorage.getItem('appPasscode');
    if (enteredPasscode === savedPasscode) {
      setPasscodeModalVisible(false);
      setEnteredPasscode(''); // Clear input after successful entry
    } else {
      Alert.alert('Error', 'Incorrect Passcode');
    }
  };

  return (
    <View style={styles.container}>
      <MainApp />

      {passcodeIsEnabled && (
        <Modal
          animationType="fade"
          transparent={false} // Use true for transparent background
          visible={passcodeModalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Enter Passcode</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Passcode"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={true}
                value={enteredPasscode}
                onChangeText={setEnteredPasscode}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePasscodeSubmit}
              >
                <Text style={styles.submitButtonText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fefbe9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
