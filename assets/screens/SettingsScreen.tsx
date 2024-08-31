import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Linking, Switch, Modal, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
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
        if (enteredPasscode) {
            await savePasscodeData(enteredPasscode);
            setPasscodeIsEnabled(true);
            setPasscodeModalVisible(false);
            setEnteredPasscode('');  // Clear the input field after saving
            Alert.alert('Success', 'Passcode enabled.');
        } else {
            Alert.alert('Error', 'Please enter a passcode.');
        }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#fefbe9',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#d7ccc8',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    passcodeButton: {
        backgroundColor: '#d7ccc8',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#4e342e',
    },
    switch: {
        marginLeft: 10,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        paddingVertical: 20,
    },
    socialIcon: {
        fontSize: 30,
        color: '#4e342e',
        marginHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
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
    passcodeInput: {
        width: '100%',
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'red'
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default App;
