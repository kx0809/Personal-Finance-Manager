import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Text, Button, ImageBackground } from "react-native";
import { Avatar } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const CustomAvatar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Your Name');
  const [editingName, setEditingName] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Open the modal for avatar selection
  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  // Handle image pick from the user's photo album
  const handleImagePick = () => {
    launchImageLibrary({}, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newAvatar = { uri: response.assets[0].uri };
        setSelectedAvatar(newAvatar);
        await AsyncStorage.setItem('selectedAvatar', JSON.stringify(newAvatar));
        setModalVisible(false);
      }
    });
  };

  // Load avatar from AsyncStorage
  const loadAvatarFromStorage = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
      if (storedAvatar) {
        setSelectedAvatar(JSON.parse(storedAvatar));
      }
    } catch (error) {
      console.error('Failed to load avatar:', error);
    }
  };

  // Handle name change
  const handleNameChange = async (newName: string) => {
    setName(newName);
    await AsyncStorage.setItem('userName', newName);
  };

  // Load name from AsyncStorage
  const loadNameFromStorage = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setName(storedName);
      }
    } catch (error) {
      console.error('Failed to load name:', error);
    }
  };

  useEffect(() => {
    loadAvatarFromStorage();
    loadNameFromStorage();
  }, []);

  return (
    <ImageBackground
      source={require('../defaultAvatar/DrawerBackground.png')} // Replace with your background image path
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Avatar
            rounded
            source={selectedAvatar ? selectedAvatar : require('../defaultAvatar/defaultAvatar.png')} // Placeholder for default avatar
            size={100}
            containerStyle={styles.avatar}
          />
        </TouchableOpacity>

        {editingName ? (
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={handleNameChange}
            onSubmitEditing={() => setEditingName(false)}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setEditingName(true)}>
            <Text style={styles.name}>{name}</Text>
          </TouchableOpacity>
        )}

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.imageContainer}>
                  {selectedAvatar ? (
                    <Image source={{ uri: selectedAvatar.uri }} style={styles.largeImage} />
                  ) : (
                    <Text>No Avatar Selected</Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <Button title="Select Photo from Album" onPress={handleImagePick} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  innerContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  avatar: {
    marginTop: 20,
    marginLeft: 0,
  },
  name: {
    marginTop: 7,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  nameInput: {
    marginTop: 10,
    borderBottomColor: '#4e342e',
    borderBottomWidth: 1,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    width: 130,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  largeImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});

export default CustomAvatar;
