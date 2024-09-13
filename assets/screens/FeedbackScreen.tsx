import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Assuming you're using this for the radio buttons
import styles from "../styles/feedbackScreenStyles";


const FeedbackScreen = () => {
  const [rating, setRating] = useState(null);
  const [feedbackType, setFeedbackType] = useState('');
  const [comment, setComment] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = () => {
    if (rating === "" || feedbackType === "" || comment === "" || recommendation === "") {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const feedbackData = {
      rating: rating,
      feedbackType: feedbackType,
      comment: comment,
      recommendation: recommendation,
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
        setRating(null);
        setFeedbackType("");
        setComment("");
        setRecommendation(null);
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

      {/* Rating Section */}
      <Text style={styles.question}>How do you rate this app? *</Text>
      <View style={styles.ratingRow}>
        {['😕', '😐', '😶', '🙂', '😄'].map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Text style={rating === index + 1 ? styles.selectedEmoji : styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Type (Radio Button) */}
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