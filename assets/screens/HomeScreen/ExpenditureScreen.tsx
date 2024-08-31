import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

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
  { id: '7', name: 'Investment', icon: 'line-chart' },
  { id: '8', name: 'Other', icon: 'ellipsis-h' },
  { id: '9', name: 'Income', icon: 'money' },
];

const { width } = Dimensions.get('window');

const ExpenditureScreen = () => {
  const [activeTab, setActiveTab] = useState('Expense');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState(''); // State for description
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={25} color="#4e342e" />
          </TouchableOpacity>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'Expense' && styles.activeButtonExpense]}
              onPress={() => handleTabPress('Expense')}
            >
              <Text style={[styles.toggleText, activeTab === 'Expense' && styles.activeTextExpense]}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'Income' && styles.activeButtonIncome]}
              onPress={() => handleTabPress('Income')}
            >
              <Text style={[styles.toggleText, activeTab === 'Income' && styles.activeTextIncome]}>Income</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, [navigation, activeTab]);

  const handleTabPress = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
    Animated.spring(translateX, {
      toValue: tabName === 'Expense' ? 0 : -width,
      useNativeDriver: true,
    }).start();
  };

  const handleIconPress = (item: React.SetStateAction<null>) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSave = () => {
    console.log(`Selected ${selectedItem.name} with amount: RM${amount} and description: ${description}`);
    setModalVisible(false);
    setAmount('');
    setDescription(''); // Clear description after save
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
      <Animated.View style={[styles.contentContainer, { transform: [{ translateX }] }]}>
        <View style={styles.tabContent}>
          <FlatList
            data={expensesData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
        <View style={styles.tabContent}>
          <FlatList
            data={incomeData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </Animated.View>

      {/* Modal for entering the amount */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name={selectedItem?.icon} size={50} color="#000" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencyText}>RM</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <View style={styles.descriptionContainer}>
            <TextInput
              style={[styles.input]}
              placeholder="Tap here to write"
              value={description}
              onChangeText={setDescription}
            />
            </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    width: '15%',
    marginLeft: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: '#4e342e',
  },
  activeButtonExpense: {
    backgroundColor: '#ffb300',
  },
  activeButtonIncome: {
    backgroundColor: '#d7ccc8',
  },
  toggleText: {
    fontSize: 16,
    color: '#4e342e',
  },
  activeTextExpense: {
    color: '#fff',
  },
  activeTextIncome: {
    color: '#4e342e',
  },
  contentContainer: {
    flexDirection: 'row',
    width: width * 2, // Double the width for two tabs
  },
  tabContent: {
    width: width, // Each tab takes up the full screen width
    padding: 10,
  },
  gridContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 10,
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
  modalIcon: {
    marginBottom: 15, // Space between icon and title
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  currencyText: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#ffb300',
  },
  cancelButton: {
    backgroundColor: '#d7ccc8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelText: {
    color: '#4e342e',
  },
});

export default ExpenditureScreen;
