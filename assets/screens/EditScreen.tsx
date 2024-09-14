import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Modal, FlatList, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { InputWithLabel, AppButton } from '../components/UI';
import { getDBConnection, updateExpenditure, getExpenditureById } from '../components/db-service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatted } from '../components/utility';
import { readDataFromFile } from '../components/ExpenseIncomeData';

const EditScreen = ({ route, navigation }) => {
  const [expenditureId, setExpenditureId] = useState(route.params.id);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Expense');
  const [date, setDate] = useState(new Date(Date.now()));
  const [openPicker, setOpenPicker] = useState(false);
  const [expensesData, setExpensesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    // Fetch data from the file and set state
    const loadData = async () => {
      const { expensesData, incomeData } = await readDataFromFile();
      setExpensesData(expensesData);
      setIncomeData(incomeData);
    };

    loadData();
    _query();
  }, []);

  const _query = async () => {
    const result = await getExpenditureById(await getDBConnection(), expenditureId);
    setType(result.type);
    setAmount(result.amount);
    setDescription(result.description);
    setSelectedCategory(result.category); 
    setDate(new Date(result.date));
  };

  const _update = async () => {
    // Validation
    if (!type.trim() || !amount.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    // Check if amount is a valid number
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid amount.');
      return;
    }

    // Proceed with update if validation passes
    await updateExpenditure(await getDBConnection(), type, amount, description, selectedCategory, date.getTime(), expenditureId);
    route.params.refresh(expenditureId);
    route.params.homeRefresh();
    navigation.goBack();
  };

  const openTypePicker = () => {
    setPickerOpen(true);
  };

  const selectType = (selectedType) => {
    setType(selectedType);
    setPickerOpen(false);
  };

  const openDatePicker = () => {
    setOpenPicker(true);
  };

  const onDateSelected = (event, value) => {
    setDate(value);
    setOpenPicker(false);
  };

  const handleAmountChange = (text) => {
    // Filter out non-numeric characters except decimal point
    const numericText = text.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = numericText.split('.');
    if (parts.length > 2) {
      return;
    }
    setAmount(numericText);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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

        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Enter amount here'}
          label={'Amount'}
          value={amount}
          onChangeText={handleAmountChange}
          orientation={'vertical'}
          keyboardType={'numeric'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Enter description here'}
          label={'Description'}
          value={description}
          onChangeText={(description) => setDescription(description)}
          orientation={'vertical'}
        />
        <TouchableWithoutFeedback onPress={openDatePicker}>
          <View>
            <InputWithLabel
              textInputStyle={styles.TextInput}
              textLabelStyle={styles.TextLabel}
              label="Date:"
              value={formatted(new Date(date))}
              editable={false}
            />
          </View>
        </TouchableWithoutFeedback>

        {openPicker &&
          <DateTimePicker
            value={new Date(date)}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            is24Hour={false}
            onChange={onDateSelected}
            style={styles.datePicker}
          />}
        <AppButton
          style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={_update}
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
    </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  }
});

export default EditScreen;
