import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Linking, Switch, Modal, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles/settingScreenStyles'

const SettingsScreen = () => {
    const [passcodeIsEnabled, setPasscodeIsEnabled] = useState<boolean>(false);
    const [passcodeModalVisible, setPasscodeModalVisible] = useState<boolean>(false);
    const [enteredPasscode, setEnteredPasscode] = useState<string>('');

    useEffect(() => {
        loadPasscodeData();
    }, []);

    const toggleSwitch = () => {
        if (!passcodeIsEnabled) {
            setPasscodeModalVisible(true);
        } else {
            handleDisablePasscode();
        }
    };

    const handleEnablePasscode = async () => {
        // Check if the passcode is empty
        if (!enteredPasscode) {
            Alert.alert('Error', 'Passcode cannot be empty.');
            return;
        }
    
        // Check if the passcode is exactly 4 digits
        if (enteredPasscode.length !== 4) {
            Alert.alert('Error', 'Passcode must be exactly 4 digits.');
            return;
        }
    
        // Save the passcode if all validations pass
        await savePasscodeData(enteredPasscode);
        setPasscodeIsEnabled(true);
        setPasscodeModalVisible(false);
        setEnteredPasscode('');  // Clear the input field after saving
        Alert.alert('Success', 'Passcode enabled.');
    };

    const handleDisablePasscode = async () => {
        await AsyncStorage.removeItem('appPasscode');
        setPasscodeIsEnabled(false);
        Alert.alert('Success', 'Passcode disabled.');
    };

    const savePasscodeData = async (passcode: string) => {
        try {
            await AsyncStorage.setItem('appPasscode', passcode);
        } catch (error) {
            Alert.alert('Error', 'Failed to save the passcode.');
        }
    };

    const loadPasscodeData = async () => {
        try {
            const savedPasscode = await AsyncStorage.getItem('appPasscode');
            if (savedPasscode) {
                setPasscodeIsEnabled(true);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load the passcode.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://www.abc.com')}>
                    <Text style={styles.buttonText}>About Us</Text>
                </TouchableOpacity>
                <View style={styles.passcodeButton}>
                    <Text style={styles.buttonText}>Passcode Lock</Text>
                    <Switch 
                        style={styles.switch}
                        onValueChange={toggleSwitch}
                        value={passcodeIsEnabled}
                    />
                </View>
            </View>
            
            <View style={styles.socialMediaContainer}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/ABC')}>
                    <Ionicons name="logo-facebook" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ABC')}>
                    <Ionicons name="logo-instagram" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/ABC')}>
                    <Ionicons name="logo-youtube" style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={passcodeModalVisible}
                onRequestClose={() => setPasscodeModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Set 4 Digit Passcode</Text>
                        <TextInput
                            style={styles.passcodeInput}
                            placeholder="Enter Passcode"
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry={true}
                            value={enteredPasscode}
                            onChangeText={setEnteredPasscode}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleEnablePasscode}>
                            <Text style={styles.saveButtonText}>Set Passcode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setPasscodeModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SettingsScreen;
