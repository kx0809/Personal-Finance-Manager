import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Text, ImageBackground } from 'react-native';
import { Avatar } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const CustomAvatar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Your Name');
  const [editingName, setEditingName] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Open the modal for avatar selection
  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  // Handle image pick from the user's photo album
  const handleImagePick = async (type) => {
    launchImageLibrary({}, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (type === 'avatar') {
          const newAvatar = { uri: response.assets[0].uri };
          setSelectedAvatar(newAvatar);
          await AsyncStorage.setItem('selectedAvatar', JSON.stringify(newAvatar));
        } else if (type === 'background') {
          const newBackground = { uri: response.assets[0].uri };
          setBackgroundImage(newBackground);
          await AsyncStorage.setItem('backgroundImage', JSON.stringify(newBackground));
        }
        setModalVisible(false);
      }
    });
  };

  // Load avatar and background from AsyncStorage
  const loadFromStorage = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
      if (storedAvatar) {
        setSelectedAvatar(JSON.parse(storedAvatar));
      }

      const storedBackgroundImage = await AsyncStorage.getItem('backgroundImage');
      if (storedBackgroundImage) {
        setBackgroundImage(JSON.parse(storedBackgroundImage));
      }

      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setName(storedName);
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    }
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <ImageBackground
      source={backgroundImage ? { uri: backgroundImage.uri } : require('../defaultAvatar/DrawerBackground.png')}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Avatar
            rounded
            source={selectedAvatar ? selectedAvatar : require('../defaultAvatar/defaultAvatar.png')}
            size={110}
            containerStyle={styles.avatar}
          />
        </TouchableOpacity>

        {editingName ? (
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            onSubmitEditing={async () => {
              setEditingName(false);
              await AsyncStorage.setItem('userName', name);
            }}
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
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleImagePick('avatar')}
              >
                <Text style={styles.buttonText}>Select Photo for Avatar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleImagePick('background')}
              >
                <Text style={styles.buttonText}>Select Background Photo</Text>
              </TouchableOpacity>
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
  modalButton: {
    backgroundColor: '#ffb300',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4e342e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAvatar;
