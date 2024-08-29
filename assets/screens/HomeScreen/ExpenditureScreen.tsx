import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const expensesData = [
  { id: '1', name: 'Food', icon: 'cutlery' },
  { id: '2', name: 'Transport', icon: 'bus' },
  { id: '3', name: 'Shopping', icon: 'shopping-cart' },
  { id: '4', name: 'Rent', icon: 'home' },
  { id: '5', name: 'Bills', icon: 'file-text' },
  { id: '6', name: 'Entertainment', icon: 'music' },
];

const incomeData = [
  { id: '1', name: 'Salary', icon: 'money' },
  { id: '2', name: 'Business', icon: 'briefcase' },
  { id: '3', name: 'Freelance', icon: 'pencil' },
  { id: '4', name: 'Investments', icon: 'line-chart' },
  { id: '5', name: 'Savings', icon: 'bank' },
  { id: '6', name: 'Other', icon: 'ellipsis-h' },
];

const ExpenditureScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Expense');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState('');

  const data = selectedCategory === 'Expense' ? expensesData : incomeData;

  const handleIconPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSave = () => {
    console.log(`Selected ${selectedItem.name} with amount: ${amount}`);
    setModalVisible(false);
    setAmount('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress(item)}>
        <Icon name={item.icon} size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedCategory === 'Expense' && styles.activeButton]}
          onPress={() => setSelectedCategory('Expense')}
        >
          <Text style={[styles.toggleText, selectedCategory === 'Expense' && styles.activeText]}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedCategory === 'Income' && styles.activeButton]}
          onPress={() => setSelectedCategory('Income')}
        >
          <Text style={[styles.toggleText, selectedCategory === 'Income' && styles.activeText]}>Income</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />

      {/* Modal for entering the amount */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter {selectedItem?.name} Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4e342e',
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: '#ffb300',
  },
  toggleText: {
    fontSize: 16,
    color: '#4e342e',
  },
  activeText: {
    color: '#fff',
  },
  itemContainer: {
    alignItems: 'center',
    width: '30%',
  },
  iconButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  gridContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#ffb300', // Primary Color (Background)
    borderColor: '#4e342e', // Primary Text Color

  },
  cancelButton: {
    backgroundColor: '#d7ccc8', // Secondary Color
  },
  buttonText: {
    fontSize: 16,
    color: '#4e342e', // Primary Text Color
  },
  cancelText: {
    color: '#fefbe9', // Accent Color
  },
});

export default ExpenditureScreen;
