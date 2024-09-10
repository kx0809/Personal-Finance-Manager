import React, { Component, useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './assets/screens/HomeScreen/screens/HomeScreen';
import ViewScreen from './assets/screens/HomeScreen/screens/ViewScreen';
import CreateScreen from './assets/screens/HomeScreen/screens/CreateScreen';
import EditScreen from './assets/screens/HomeScreen/screens/EditScreen';
import CustomDropdown from './assets/screens/HomeScreen/CustomDropdown'; 
import CategoriesScreen from './assets/screens/CategoriesScreen/CategoriesScreen';
import ReportScreen from './assets/screens/ReportScreen';
import CustomDrawerComponent from './assets/components/CustomDrawerComponent';
import SettingsScreen from './assets/screens/SettingsScreen';
import MonthYearDropdown from './assets/screens/HomeScreen/MonthYearDropdown'; 

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for screens related to HomeScreen
function HomeStack({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [monthYearModalVisible, setMonthYearModalVisible] = useState(false); // Separate state for monthYearModal
  const [selectedDate, setSelectedDate] = useState(null);

  // Get current date and initialize state
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-based (1 = January, 2 = February, ...)
  const currentYear = now.getFullYear();

  const [selectedMonthYear, setSelectedMonthYear] = useState({ 
    month: currentMonth.toString(), // Convert to string for consistent format
    year: currentYear.toString() 
  });

  const handleMonthYearChange = (selected) => {
    setSelectedMonthYear(selected);
  };

  const formatMonthYear = (month: string, year: string) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Convert month from 1-based to 0-based for array lookup
    const monthIndex = parseInt(month, 10) - 1;
  
    return `${monthNames[monthIndex]} ${year}`;
  };
  

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffb300',
            },
            headerTitle: () => (
              <View style={styles.header}>
                <TouchableOpacity style={styles.dateButton} onPress={() => setMonthYearModalVisible(true)}>
                  <Text style={styles.dateButtonText}>{formatMonthYear(selectedMonthYear.month, selectedMonthYear.year)}</Text>
                  <Ionicons
                  name="chevron-down-outline"
                  size={18}
                  color="#4e342e"
                  style={{ marginLeft: 8}}
                />
                </TouchableOpacity>
              </View>
            ),
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons
                  name="menu"
                  size={25}
                  color="#000"
                  style={{ marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons
                  name="calendar"
                  size={30}
                  color="#000"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
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

      {/* Modal for CustomDropdown Calendar */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <CustomDropdown
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>

      {/* Modal for MonthYearDropdown */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={monthYearModalVisible} // Use monthYearModalVisible here
        onRequestClose={() => {
          setMonthYearModalVisible(!monthYearModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month and Year</Text>
            <MonthYearDropdown selectedMonthYear={selectedMonthYear} onMonthYearChange={handleMonthYearChange} />
            <TouchableOpacity style={styles.saveButton} onPress={() => setMonthYearModalVisible(false)}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
          name="HomeScreen"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Report" component={ReportScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
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
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Enter Passcode</Text>
                <TextInput
                  style={styles.passcodeInput}
                  value={enteredPasscode}
                  onChangeText={(text) => this.setState({ enteredPasscode: text })}
                  keyboardType="numeric"
                  secureTextEntry
                />
                <TouchableOpacity style={styles.submitButton} onPress={this.handlePasscodeSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ passcodeModalVisible: false })}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
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
  submitButtonText: {
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
  saveButton: {
    backgroundColor: '#ffb300', // Background color
    paddingVertical: 10, // Padding
    width: '73%',
    borderRadius: 5, // Border radius
    marginBottom: 10, // Margin top for spacing
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#4e342e', 
    fontSize: 16,
    fontWeight: 'bold',

  },
});
