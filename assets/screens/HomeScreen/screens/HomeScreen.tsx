import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, SectionList, ScrollView } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDBConnection, getExpenditures } from '../db-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatted } from '../utility';
import { useFocusEffect } from '@react-navigation/native';
import CustomHomeScreenPieChart from '../CustomHomeScreenPieChart'; // Import the Pie Chart component

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
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [selectedMonthYear, setSelectedMonthYear] = useState<{ month: string; year: string }>({
    month: '1',
    year: new Date().getFullYear().toString(),
  });

  const _query = useCallback(async () => {
    console.log('Fetching data with:', selectedMonthYear);
    const dbConnection = await getDBConnection();
    const fetchedExpenditures = await getExpenditures(dbConnection);
  
    const filteredExpenditures = fetchedExpenditures.filter((item: any) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() === parseInt(selectedMonthYear.month, 10) - 1 &&
        itemDate.getFullYear() === parseInt(selectedMonthYear.year, 10)
      );
    });
  
    const sortedExpenditures = filteredExpenditures.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
    const groupedExpenditures = sortedExpenditures.reduce((groups: any, item: any) => {
      const dateKey = formatted(new Date(item.date), 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = { income: 0, expense: 0, data: [] };
      }
      if (item.category === 'Income') {
        groups[dateKey].income += parseFloat(item.amount); 
      } else {
        groups[dateKey].expense += parseFloat(item.amount); 
      }
      groups[dateKey].data.push(item);
      return groups;
    }, {});
  
    const sections = Object.keys(groupedExpenditures).map(dateKey => {
      const { income, expense, data } = groupedExpenditures[dateKey];
      const netTotal = income - expense || 0;
      return {
        title: dateKey,
        netTotal,
        data,
      };
    });
  
    // Calculate total income
    const totalIncome = filteredExpenditures.reduce((sum: number, item: any) => {
      return item.category === 'Income' ? sum + parseFloat(item.amount) : sum;
    }, 0);

    // Calculate total expense
    const totalExpense = filteredExpenditures.reduce((sum: number, item: any) => {
      return item.category === 'Expense' ? sum + parseFloat(item.amount) : sum;
    }, 0);
  
    setExpenditures(sections);
    setTotalExpense(totalExpense);
    setTotalIncome(totalIncome); 
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

  const getPlusMinus = (type: string) => {
    return type === 'Expense' ? '- ' : '+';
  };

  const getIcon = (type: string, category: string) => {
    const data = category === 'Expense' ? expensesData : incomeData;
    const item = data.find((item) => item.name === type);
    return item ? item.icon : 'question';
  };

  // Format net total with proper sign
  const formatNetTotal = (netTotal: number) => {
    if (netTotal < 0) {
      return `- RM ${Math.abs(netTotal).toFixed(2)}`;
    }
    return `RM ${netTotal.toFixed(2)}`;
  };

  const formatTotalIncome = (income: number) => {
    if (typeof income !== 'number' || isNaN(income)) {
      console.error('Invalid totalIncome value:', income);
      return 'RM 0.00';
    }
    return `RM ${income.toFixed(2)}`;

  };

  const formatTotalExpense = (expense: number) => {
    if (typeof expense !== 'number' || isNaN(expense)) {
      console.error('Invalid totalExpense value:', expense);
      return 'RM 0.00';
    }
    return `RM ${expense.toFixed(2)}`;

  };

  // Determine border colors
  const expenseBorderColor = totalExpense === 0 ? '#cccccc' : '#ffe8e8';
  const incomeBorderColor = totalIncome === 0 ? '#cccccc' : '#e8f7ff';
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalExpenseIncomeContainer}>
            <Text style={[styles.totalExpenseText, { borderBottomColor: expenseBorderColor }]}>Expense:</Text>
            <Text style={styles.totalAmount}>{formatTotalExpense(totalExpense)}</Text>
          </View>
          <View style={styles.totalExpenseIncomeContainer}>
            <Text style={[styles.totalIncomeText, { borderBottomColor: incomeBorderColor }]}>Income:</Text>
            <Text style={styles.totalAmount}>{formatTotalIncome(totalIncome)}</Text>
          </View>
        </View>

      
        <CustomHomeScreenPieChart
          data={{
            Expense: totalExpense,
            Income: totalIncome
          }}
          selectedMonth={`${selectedMonthYear.month}-${selectedMonthYear.year}`}
        />
        
        {expenditures.length === 0 ? (
          <Text style={styles.noRecordsText}>No record, press + to add</Text>
        ) : (
        <SectionList
          sections={expenditures}
          keyExtractor={(item: any) => item.id.toString()}
          renderSectionHeader={({ section: { title, netTotal } }) => (
            <View style={styles.sectionHeaderWrapper}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionNetTotal}>{formatNetTotal(netTotal)}</Text>
              </View>
            </View>
          )}
          renderItem={({ item, index, section }) => {
            const isLastItem = index === section.data.length - 1;

            return (
              <View
                style={[
                  styles.itemWrapper,
                  isLastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
                  { backgroundColor: getBackgroundColor(item.category) },
                  index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                ]}
              >
                <TouchableHighlight
                  underlayColor="#d7ccc8"
                  onPress={() => {
                    navigation.navigate('ViewScreen', {
                      id: item.id,
                      headerTitle: item.type,
                      refresh: _query,
                    });
                  }}>
                  <View style={styles.details}>
                    <View style={styles.item}>
                      <View style={styles.type}>
                        <Icon name={getIcon(item.type, item.category)} size={20} color="#000" />
                        <Text style={styles.itemTitle}>{item.type}</Text>
                      </View>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                    <Text style={styles.itemAmount}>{getPlusMinus(item.category)}RM {item.amount}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            );
          }}
        />
        )
      }
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name === 'add') {
            navigation.navigate('CreateScreen', { refresh: _query });
          }
        }}
        color="#ffb300" 
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
  sectionHeaderWrapper: {
    marginHorizontal: 15, // Adds space on the sides
    marginTop: 20, // Adds space above each section header
  },
  sectionHeader: {
    backgroundColor: 'white', // Beige background for the header
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopRightRadius: 10, // Rounded corners for the header
    borderTopLeftRadius: 10, // Rounded corners for the header
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4e342e', // Dark brown text color
  },
  sectionNetTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffb300', // Accent color for net total
  },
  itemWrapper: {
    marginHorizontal: 15,
    borderWidth: 1, // Border width for each item
    borderColor: '#ccc',
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
    paddingVertical: 8,
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
  itemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -15,
  },
  totalIncomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
    borderBottomWidth: 7, // Adjust the width as needed
    paddingBottom: 0, // Adjust this value to move the border up
  },
  totalExpenseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
    borderBottomWidth: 7, // Adjust the width as needed
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
  },
  totalExpenseIncomeContainer:{
    margin: 15,
    padding: 10,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  noRecordsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 80,
  },
});

export default HomeScreen;
