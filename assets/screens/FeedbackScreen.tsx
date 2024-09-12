import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import styles from "../styles/feedbackScreenStyles";

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
        Alert.alert("Success", "Feedback submitted successfully. We will contact you as soon as possible!");
        // Clear the text fields
        setName("");
        setEmail("");
        setMessage("");
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

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        placeholderTextColor="#d7ccc8"  
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="#d7ccc8"  
      />

      <TextInput
        style={[styles.input, styles.messageInput]}  
        placeholder="Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        placeholderTextColor="#d7ccc8"  
        textAlignVertical="top"  
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
