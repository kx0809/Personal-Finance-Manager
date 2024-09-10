import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDBConnection, getExpenditures } from '../db-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatted } from '../utility';
import { useFocusEffect } from '@react-navigation/native';

// Define your expense and income data
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

const actions = [
  {
    text: 'Add',
    icon: require('../icons/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

const HomeScreen = ({ route, navigation }: any) => {
  const [expenditures, setExpenditures] = useState<any>([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState<{ month: string; year: string }>({
    month: '1',
    year: new Date().getFullYear().toString(),
  });

  // Function to fetch and update expenditures
  const _query = useCallback(async () => {
    console.log('Fetching data with:', selectedMonthYear);
    const dbConnection = await getDBConnection();
    const fetchedExpenditures = await getExpenditures(dbConnection);

    // Filter expenditures based on the selected month and year
    const filteredExpenditures = fetchedExpenditures.filter((item: any) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() === parseInt(selectedMonthYear.month, 10) - 1 &&
        itemDate.getFullYear() === parseInt(selectedMonthYear.year, 10)
      );
    });

    // Sort expenditures by date in descending order
    const sortedExpenditures = filteredExpenditures.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setExpenditures(sortedExpenditures);
  }, [selectedMonthYear]);

  useEffect(() => {
    const loadMonthYearData = async () => {
      try {
        const savedMonth = await AsyncStorage.getItem('Month');
        const savedYear = await AsyncStorage.getItem('Year');
        if (savedMonth !== null && savedYear !== null) {
          setSelectedMonthYear({ month: savedMonth, year: savedYear });
        }
      } catch (error) {
        console.error('Failed to load the month and year:', error);
      }
    };

    loadMonthYearData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen focused, updating data...');
      _query();
    }, [_query])
  );

  const getBackgroundColor = (type: string) => {
    return type === 'Expense' ? '#ffe8e8' : '#e8f7ff';
  };

  const getIcon = (type: string, category: string) => {
    const data = category === 'Expense' ? expensesData : incomeData;
    const item = data.find((item) => item.name === type);
    return item ? item.icon : 'question';
  };

  return (
    <View style={styles.container}>
      {/* FlatList displaying expenditures */}
      <FlatList
        data={expenditures}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }: any) => (
          <TouchableHighlight
            underlayColor="#d7ccc8"
            onPress={() => {
              navigation.navigate('ViewScreen', {
                id: item.id,
                headerTitle: item.type,
                refresh: _query,
              });
            }}>
            <View style={[styles.details, { backgroundColor: getBackgroundColor(item.category) }]}>
              <View style={styles.item}>
                <View style={styles.type}>
                  <Icon name={getIcon(item.type, item.category)} size={20} color="#000" />
                  <Text style={styles.itemTitle}>{item.type}</Text>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemSubtitle}>{formatted(new Date(item.date))}</Text>
              </View>
              <Text style={styles.itemAmount}>RM{item.amount}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />

      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        color={'#ffb300'}
        onPressItem={() => {
          navigation.navigate('CreateScreen', {
            refresh: _query,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'column',
    paddingVertical: 10,
    flex: 1,
  },
  type: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  itemDescription: {
    fontSize: 17,
    marginLeft: 10,
  },
  itemSubtitle: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
  },
  itemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 'auto',
  },
});

export default HomeScreen;
