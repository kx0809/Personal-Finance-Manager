import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import vector icons

const App = () => {
    // Function to open the URL in the default browser
    const handleAboutUsPress = () => {
        Linking.openURL('https://www.abc.com')
            .catch(err => Alert.alert('Error', 'Unable to open the URL.'));
    };

    const handleSocialMediaPress = (url: string) => {
        Linking.openURL(url)
            .catch(err => Alert.alert('Error', 'Unable to open the URL.'));
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAboutUsPress}>
                    <Text style={styles.buttonText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Notification Pressed')}>
                    <Text style={styles.buttonText}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Passcode Lock Pressed')}>
                    <Text style={styles.buttonText}>Passcode Lock</Text>
                </TouchableOpacity>
            </View>
            
            {/* Social Media Icons */}
            <View style={styles.socialMediaContainer}>
                <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.facebook.com/ABC')}>
                    <Ionicons name="logo-facebook" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.instagram.com/ABC')}>
                    <Ionicons name="logo-instagram" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.youtube.com/ABC')}>
                    <Ionicons name="logo-youtube" style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
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
        width: '80%', // Adjust width as needed
    },
    button: {
        backgroundColor: '#d7ccc8', // Background color for buttons
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#4e342e', // Text color
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
});

export default App;
