import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableWithoutFeedback, Modal, FlatList, Text, TouchableOpacity } from 'react-native';
import { InputWithLabel, AppButton } from '../UI';
import { LogBox } from 'react-native';
import { getDBConnection, createExpenditure } from '../db-service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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
  { id: '2', name: 'Bonus', icon: 'gift' },
  { id: '3', name: 'Rebate', icon: 'percent' },
  { id: '4', name: 'Trade', icon: 'exchange' },
  { id: '5', name: 'Dividend', icon: 'line-chart' },
  { id: '6', name: 'Rent', icon: 'home' },
  { id: '7', name: 'Investment', icon: 'home' },
  { id: '8', name: 'Other', icon: 'home' },
  { id: '9', name: 'Income', icon: 'home' },
];

const CreateScreen = ({ route, navigation }) => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Expense'); // Default category

  useEffect(() => {
      navigation.setOptions({ headerTitle: 'Add New' });
  }, []);

  const _insert = async () => {
      await createExpenditure(await getDBConnection(), type, amount, description, selectedCategory);
      route.params.refresh();
      navigation.goBack();
  };

  const openTypePicker = () => {
      setPickerOpen(true);
  };

  const selectType = (selectedType: React.SetStateAction<string>) => {
      setType(selectedType);
      setPickerOpen(false);
  };

  return (
      <ScrollView style={styles.container}>
          {/* Type Picker */}
          <TouchableWithoutFeedback onPress={openTypePicker}>
              <View>
                  <InputWithLabel
                      textLabelStyle={styles.TextLabel}
                      textInputStyle={styles.TextInput}
                      label={'Type'}
                      placeholder={'Select type'}
                      value={type}
                      editable={false}
                  />
              </View>
          </TouchableWithoutFeedback>

          {/* Amount Input */}
          
          <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Enter amount here'}
              label={'Amount'}
              value={amount}
              onChangeText={(amount: React.SetStateAction<string>) => setAmount(amount)}
              orientation={'vertical'}
              keyboardType={'numeric'} // Use numeric keyboard
          />

          {/* Description Input */}
          <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Enter description here'}
              label={'Description'}
              value={description}
              onChangeText={(description: React.SetStateAction<string>) => setDescription(description)}
              orientation={'vertical'}
          />

          {/* Save Button */}
          <AppButton
              style={styles.button}
              title={'Save'}
              theme={'primary'}
              onPress={_insert}
          />

          {/* Type Picker Modal */}
          <Modal
              visible={isPickerOpen}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setPickerOpen(false)}
          >
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      {/* Category Buttons */}
                      <View style={styles.categoryButtons}>
                          <TouchableOpacity
                              style={[styles.categoryButton, selectedCategory === 'Expense' && styles.selectedExpenseButton]}
                              onPress={() => setSelectedCategory('Expense')}
                          >
                              <Text style={styles.categoryButtonText}>Expense</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={[styles.categoryButton, selectedCategory === 'Income' && styles.selectedIncomeButton]}
                              onPress={() => setSelectedCategory('Income')}
                          >
                              <Text style={styles.categoryButtonText}>Income</Text>
                          </TouchableOpacity>
                      </View>
                      <FlatList
                          data={selectedCategory === 'Expense' ? expensesData : incomeData}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                              <TouchableWithoutFeedback onPress={() => selectType(item.name)}>
                                  <View style={styles.typeOption}>
                                      <FontAwesome name={item.icon} size={24} color="#4e342e" />
                                      <Text style={styles.typeText}>{item.name}</Text>
                                  </View>
                              </TouchableWithoutFeedback>
                          )}
                      />
                  </View>
              </View>
          </Modal>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },
  TextInput: {
    fontSize: 24,
    color: '#000099',
  },
  button: {
    margin: 5,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // To darken the background
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    height: 400, // Fixed height for the modal content
    borderRadius: 10,
    padding: 20,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  typeText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#4e342e',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  categoryButton: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 7,
    paddingTop: 7,
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedExpenseButton: {
    backgroundColor: '#ffe8e8',
  },
  selectedIncomeButton: {
    backgroundColor: '#e8f7ff',
  },
  categoryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
  },
});

export default CreateScreen;
