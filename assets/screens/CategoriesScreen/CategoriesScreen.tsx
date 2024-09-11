import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
  { id: '6', name: 'IncomeRent', icon: 'home' },
  { id: '7', name: 'Investment', icon: 'home' },
  { id: '8', name: 'Other', icon: 'home' },
  { id: '9', name: 'Income', icon: 'home' },
];

const { width } = Dimensions.get('window');


const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Expense');
  const translateX = useRef(new Animated.Value(0)).current;

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
          style={[styles.navItem, activeTab === 'Expense' && styles.activeNavItem]}
          onPress={() => handleTabPress('Expense')}
        >
          <Text style={[styles.navText, activeTab === 'Expense' && styles.activeNavText]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Income' && styles.activeNavItem]}
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
    backgroundColor: '#fff',
    padding: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4e342e',
    marginHorizontal: 10,
  },
  activeNavItem: {
    backgroundColor: '#ffb300',
  },
  navText: {
    fontSize: 16,
    color: '#4e342e'
  },
  activeNavText: {
    color: '#fff',
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
});

export default CategoriesScreen;
