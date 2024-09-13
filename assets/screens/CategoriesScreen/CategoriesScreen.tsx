import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { readDataFromFile } from '../../components/ExpenseIncomeData'; 


const { width } = Dimensions.get('window');

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Expense');
  const [incomeData, setIncomeData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDataFromFile();
      setIncomeData(data.incomeData);
      setExpensesData(data.expensesData);
    };

    fetchData();
  }, []);

  const handleTabPress = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
    Animated.spring(translateX, {
      toValue: tabName === 'Expense' ? 0 : -width, // Move to the correct tab
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate(item.name);
    };

    return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={handlePress}>
        <Icon name={item.icon} size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navExpense, activeTab === 'Expense' && styles.activeNavExpense]}
          onPress={() => handleTabPress('Expense')}
        >
          <Text style={[styles.navText, activeTab === 'Expense' && styles.activeNavText]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navIncome, activeTab === 'Income' && styles.activeNavIncome]}
          onPress={() => handleTabPress('Income')}
        >
          <Text style={[styles.navText, activeTab === 'Income' && styles.activeNavText]}>
            Income
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated View for Tabs */}
      <Animated.View style={[styles.contentContainer, { transform: [{ translateX }] }]}>
        {/* Expense Tab */}
        <View style={styles.tabContent}>
          <FlatList
            data={expensesData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
        {/* Income Tab */}
        <View style={styles.tabContent}>
          <FlatList
            data={incomeData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </Animated.View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  navBar: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 35,
    borderWidth: 1.5,
    borderColor: '#4e342e',
    borderRadius: 20,
    alignSelf: 'center',
    width: '63.5%',
    paddingVertical: 0.5,
  },
  navIncome: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 0,
  },
  navExpense: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 0,
  },
  activeNavIncome: {
    backgroundColor: '#e8f7ff',
  },
  activeNavExpense: {
    backgroundColor: '#ffe8e8',
  },
  navText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#4e342e'
  },
  activeNavText: {
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
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CategoriesScreen;
