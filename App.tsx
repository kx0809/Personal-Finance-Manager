import React, { Component, useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import Ionicons
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens and components
import HomeScreen from './assets/screens/HomeScreen/screens/HomeScreen';
import ViewScreen from './assets/screens/HomeScreen/screens/ViewScreen';
import CreateScreen from './assets/screens/HomeScreen/screens/CreateScreen';
import EditScreen from './assets/screens/HomeScreen/screens/EditScreen';
import CustomDropdown from './assets/screens/HomeScreen/CustomDropdown'; // Import CustomDropdown
import CategoriesScreen from './assets/screens/CategoriesScreen/CategoriesScreen';
import FeedbackScreen from './assets/screens/FeedbackScreen';
import SearchScreen from './assets/screens/SearchScreen';
import ReportScreen from './assets/screens/ReportScreen';
import CustomDrawerComponent from './assets/components/CustomDrawerComponent';
import SettingsScreen from './assets/screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for screens related to HomeScreen
function HomeStack({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons
                  name="menu"
                  size={30}
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
        <CustomDropdown
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setModalVisible(false);
          }}
        />
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
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Report" component={ReportScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Feedback" component={FeedbackScreen} />
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
                  style={styles.modalInput}
                  placeholder="Enter Passcode"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry={true}
                  value={enteredPasscode}
                  onChangeText={(text) => this.setState({ enteredPasscode: text })}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.handlePasscodeSubmit}
                >
                  <Text style={styles.submitButtonText}>Enter</Text>
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
