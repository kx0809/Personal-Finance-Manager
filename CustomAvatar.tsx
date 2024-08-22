import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Text, FlatList, ImageSourcePropType } from "react-native";
import { Avatar } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarOptions from './AvatarOptions';

const CustomAvatar = () => {
  // State to control the visibility of the modal for avatar selection
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // State to store the user's name
  const [name, setName] = useState<string>('Your Name');

  // State to determine if the user's name is being edited
  const [editingName, setEditingName] = useState<boolean>(false);

  // State to store the currently selected avatar image
  const [selectedAvatar, setSelectedAvatar] = useState<ImageSourcePropType>(avatarOptions[0]);

  // Function to handle press on the avatar, which opens the modal for selecting a new avatar
  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  // Function to handle selecting a new avatar from the list
  // It sets the selected avatar to state and saves the choice in AsyncStorage
  const handleAvatarSelect = async (avatar: ImageSourcePropType) => {
    setSelectedAvatar(avatar);
    try {
      // Save the selected avatar to AsyncStorage
      await AsyncStorage.setItem('selectedAvatar', JSON.stringify(avatar));
    } catch (error) {
      console.error('Failed to save avatar:', error);
    }
    setModalVisible(false);
  };

  // Function to load the stored avatar from AsyncStorage when the component mounts
  const loadAvatarFromStorage = async () => {
    try {
      // Retrieve the avatar from AsyncStorage
      const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
      if (storedAvatar) {
        // Parse and set the retrieved avatar
        setSelectedAvatar(JSON.parse(storedAvatar));
      }
    } catch (error) {
      console.error('Failed to load avatar:', error);
    }
  };

  // Function to handle changes to the user's name and save it in AsyncStorage
  const handleNameChange = async (newName: string) => {
    setName(newName);
    try {
      // Save the updated name to AsyncStorage
      await AsyncStorage.setItem('userName', newName);
    } catch (error) {
      console.error('Failed to save name:', error);
    }
  };

  // Function to load the user's name from AsyncStorage when the component mounts
  const loadNameFromStorage = async () => {
    try {
      // Retrieve the name from AsyncStorage
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        // Set the retrieved name
        setName(storedName);
      }
    } catch (error) {
      console.error('Failed to load name:', error);
    }
  };

  // useEffect hook to load avatar and name from AsyncStorage when the component is first rendered
  useEffect(() => {
    loadAvatarFromStorage();
    loadNameFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      {/* TouchableOpacity to open the modal for selecting a new avatar */}
      <TouchableOpacity onPress={handleAvatarPress}>
        <Avatar
          rounded
          source={selectedAvatar} // Display the currently selected avatar
          size={130}
          containerStyle={styles.avatar}
        />
      </TouchableOpacity>

      {/* Conditional rendering for editing the user's name */}
      {editingName ? (
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={handleNameChange} // Update the name as the user types
          onSubmitEditing={() => setEditingName(false)} // Exit edit mode when submitting
          autoFocus // Automatically focus on the input field when in edit mode
        />
      ) : (
        <TouchableOpacity onPress={() => setEditingName(true)}>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      )}

      {/* Modal to display the list of avatar options */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={avatarOptions} // List of avatar options
              numColumns={3} // Display avatars in a 3-column grid
              keyExtractor={(item) => item.toString()} // Use string representation of the item as the key
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleAvatarSelect(item)} style={styles.avatarOption}>
                  <Image source={item} style={styles.avatarImage} />
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefbe9',
  },
  avatar: {
    borderColor: '#D7CCC8',
    borderWidth: 5,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    color: '#4e342e',
    fontWeight: 'bold',
  },
  nameInput: {
    marginTop: 10,
    borderBottomColor: '#4e342e',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#4e342e',
    textAlign: 'center',
    width: 130,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  avatarOption: {
    margin: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CustomAvatar;
