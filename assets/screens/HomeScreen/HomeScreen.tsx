import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const exampleExpenditures = [
  { id: '1', amount: 50, category: 'Sports' },
  { id: '2', amount: 30, category: 'Food' },

];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newExpenditure, setNewExpenditure] = useState({
    amount: '',
    category: '',
  });
  const [expenditures, setExpenditures] = useState(exampleExpenditures);

  const handleSave = () => {
    setExpenditures([
      ...expenditures,
      {
        id: (expenditures.length + 1).toString(),
        amount: parseFloat(newExpenditure.amount),
        category: newExpenditure.category,
      },
    ]);
    setModalVisible(false);
    setNewExpenditure({ amount: '', category: '' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenditures}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.amount}</Text>
            <Text style={styles.itemText}>{item.category}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Expenditure</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={newExpenditure.amount}
              onChangeText={(text) => setNewExpenditure({ ...newExpenditure, amount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newExpenditure.category}
              onChangeText={(text) => setNewExpenditure({ ...newExpenditure, category: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#fff" />
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
    backgroundColor: '#fefbe9', // Primary Color
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#fff', 
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#4e342e', // Primary Text Color
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffb300', // Accent Color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For shadow effect on Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: '#ffffff', // White background for the modal content
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#ffb300', // Accent Color
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  saveButtonText: {
    color: '#4e342e', // Primary Text Color
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
