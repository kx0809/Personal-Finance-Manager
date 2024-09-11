import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";

const FeedbackScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (name === "" || email === "" || message === "") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const feedbackData = {
      name: name,
      email: email,
      message: message,
    };

    fetch('http://10.0.2.2:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        Alert.alert("Success", "Feedback submitted successfully");
      } else {
        Alert.alert("Error", "Failed to submit feedback");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Alert.alert("Error", "Network error");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feedback Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        placeholderTextColor="#d7ccc8"  // Secondary Color for placeholder
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="#d7ccc8"  // Secondary Color for placeholder
      />

      <TextInput
        style={[styles.input, styles.messageInput]}  // Apply additional styling for the message input
        placeholder="Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        placeholderTextColor="#d7ccc8"  // Secondary Color for placeholder
        textAlignVertical="top"  // Ensures text starts from the top
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fefbe9',  // Primary Color (Beige)
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4e342e',  // Primary Text Color (Dark Brown)
  },
  input: {
    height: 40,
    borderColor: '#d7ccc8',  // Secondary Color (Light Brown)
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#4e342e',  // Input text color matching Primary Text Color (Dark Brown)
    backgroundColor: '#ffffff',  // Input background color (white for clarity)
  },
  messageInput: {
    height: 100,  // Increase height for larger message box
  },
  button: {
    backgroundColor: '#ffb300',  // Accent Color (Amber)
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',  // Button text color (white for contrast)
    fontSize: 16,
  },
});

export default FeedbackScreen;
