import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper'; 
import styles from "../styles/feedbackScreenStyles";

const FeedbackScreen = () => {
  // State variables to store user input
  const [rating, setRating] = useState(null);
  const [feedbackType, setFeedbackType] = useState('');
  const [comment, setComment] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  // Handle the form submission
  const handleSubmit = () => {
    // Validate that all required fields are filled
    if (rating === "" || feedbackType === "" || comment === "" || recommendation === "") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    // Prepare the feedback data to send
    const feedbackData = {
      rating: rating,
      feedbackType: feedbackType,
      comment: comment,
      recommendation: recommendation,
    };

    // Send feedback data to the server via POST request in JSON format
    fetch('http://10.0.2.2:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),  // Convert feedback data to JSON
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // If submission is successful, give alert to the user and clear the form
        Alert.alert("Success", "Feedback submitted successfully. We will contact you as soon as possible!");
        setRating(null);
        setFeedbackType("");
        setComment("");
        setRecommendation(null);
      } else {
        // Handle failure in feedback submission
        Alert.alert("Error", "Failed to submit feedback");
      }
    })
    .catch((error) => {
      // Handle network or request errors
      console.error("Error:", error);
      Alert.alert("Error", "Network error");
    });
  };

  return (
    <View style={styles.container}>

      {/* Rating Section */}
      <Text style={styles.question}>How do you rate this app? *</Text>
      <View style={styles.ratingRow}>
        {['😕', '😐', '😶', '🙂', '😄'].map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            {/* Highlight the selected emoji */}
            <Text style={rating === index + 1 ? styles.selectedEmoji : styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Type */}
      <Text style={styles.question}>What is your feedback about?</Text>
      <RadioButton.Group onValueChange={value => setFeedbackType(value)} value={feedbackType}>
        <RadioButton.Item label="This app" value="app" />
        <RadioButton.Item label="The RTG mobile feedback solution" value="feedbackSolution" />
      </RadioButton.Group>

      {/* Comment Section */}
      <Text style={styles.question}>Would you like to add a comment?</Text>
      <TextInput
        style={styles.commentBox}
        placeholder="Type your comment here..."
        multiline
        numberOfLines={4}
        onChangeText={text => setComment(text)}
        value={comment}
      />

      {/* Recommendation Rating */}
      <Text style={styles.question}>How likely are you to recommend our in-app feedback solution?</Text>
      <View style={styles.recommendationRow}>
        {Array.from({ length: 11 }, (_, i) => (
          <TouchableOpacity key={i} onPress={() => setRecommendation(i)}>
            {/* Highlight the selected recommendation */}
            <Text style={recommendation === i ? styles.selectedRecommendation : styles.recommendation}>
              {i}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Send feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
