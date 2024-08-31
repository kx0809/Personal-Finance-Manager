import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Text, FlatList, ImageSourcePropType } from "react-native";
import { Avatar } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarOptions from './AvatarOptions';

const CustomAvatar = () => {
  const [avatarModalVisible, setAvatarModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('Your Name');
  const [editingName, setEditingName] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<ImageSourcePropType>(avatarOptions[0]);

  // Function to handle selecting a new avatar from the list
  // It sets the selected avatar to state and saves the choice in AsyncStorage
  const handleAvatarSelect = async (avatar: ImageSourcePropType) => {
    setSelectedAvatar(avatar);
    try {
      await AsyncStorage.setItem('selectedAvatar', JSON.stringify(avatar));
    } catch (error) {
      console.error('Failed to save avatar:', error);
    }
    setAvatarModalVisible(false);
  };

  // Function to load the stored avatar from AsyncStorage when the component mounts
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

  const handleNameChange = async (newName: string) => {
    setName(newName);
    try {
      await AsyncStorage.setItem('userName', newName);
    } catch (error) {
      console.error('Failed to save name:', error);
    }
  };

  // Function to load the user's name from AsyncStorage when the component mounts
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
    <View style={styles.container}>
      {/* TouchableOpacity to open the modal for selecting a new avatar */}
      <TouchableOpacity onPress={()=>setAvatarModalVisible(true)}>
        <Avatar
          rounded
          source={selectedAvatar} 
          size={130}
          containerStyle={styles.avatar}
        />
      </TouchableOpacity>

      {/* Conditional rendering for editing the user's name */}
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

      {/* Modal to display the list of avatar options */}
      <Modal
        visible={avatarModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setAvatarModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={avatarOptions} 
              numColumns={3} 
              keyExtractor={(item) => item.toString()}
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
