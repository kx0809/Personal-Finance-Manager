import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, SectionList, ScrollView, LogBox, Modal } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDBConnection, getExpenditures } from '../components/db-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatted } from '../components/utility';
import { useFocusEffect } from '@react-navigation/native';
import CustomHomeScreenPieChart from '../components/CustomHomeScreenPieChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { readDataFromFile } from '../components/ExpenseIncomeData';
import MonthYearDropdown from '../components/MonthYearDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import CustomHomescreenHeader from '../components/CustomHomescreenHeader';
import CustomDropdownCalendar from '../components/CustomDropdownCalendar'; 

LogBox.ignoreLogs([
  ' VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const actions = [
  {
    text: 'Add',
    icon: require('../icons/add_icon.png'),
    name: 'add',
    position: 1,
    color: '#ffb300',
  },
];

const HomeScreen = ({ navigation }: any) => {
  const [expenditures, setExpenditures] = useState<any>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [selectedMonthYear, setSelectedMonthYear] = useState({ month: '1', year: new Date().getFullYear().toString() });
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false); // New state variable
  const [monthYearModalVisible, setMonthYearModalVisible] = useState(false); // Separate state for monthYearModal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleMenuPress = () => {
    navigation.toggleDrawer();
  };


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
  }, [selectedMonthYear, incomeData, expensesData]);

  useEffect(() => {
    const loadMonthYearData = async () => {
      try {
        const savedMonth = await AsyncStorage.getItem('Month');
        const savedYear = await AsyncStorage.getItem('Year');
        if (savedMonth !== null && savedYear !== null) {
          setSelectedMonthYear({ month: savedMonth, year: savedYear });
          setDataLoaded(true); // Set dataLoaded to true once data is loaded
        }
      } catch (error) {
        console.error('Failed to load the month and year:', error);
      }
    };

    const loadDefaultData = async () => {
      const data = await readDataFromFile();
      setIncomeData(data.incomeData);
      setExpensesData(data.expensesData);
    };

    loadMonthYearData();
    loadDefaultData();
  }, []);

  useEffect(() => {
    _query(); // Fetch data when month or year changes
  }, [selectedMonthYear, _query]);

  const handleMonthYearChange = (newMonthYear: React.SetStateAction<{ month: string; year: string; }>) => {
    setSelectedMonthYear(newMonthYear);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Handle any additional logic when a date is selected
  };

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

  const formatMonthYear = (month: string, year: string) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Convert month from 1-based to 0-based for array lookup
    const monthIndex = parseInt(month, 10) - 1;
  
    return `${monthNames[monthIndex]} ${year}`;
  };

  const handleCloseModal = () => {
    setMonthYearModalVisible(false);
  };

  // Determine border colors
  const expenseBorderColor = totalExpense === 0 ? '#cccccc' : '#ffe8e8';
  const incomeBorderColor = totalIncome === 0 ? '#cccccc' : '#e8f7ff';
  
    
  return (
    <>
    <View style={styles.container}>
        <CustomHomescreenHeader
          onMenuPress={handleMenuPress} onCalendarPress={() => setModalVisible(true)}    
        />
      <View style={styles.buttonContainer} >
      <TouchableOpacity style={styles.dateButton} onPress={() => setMonthYearModalVisible(true)}>
          <Text style={styles.dateButtonText}>{formatMonthYear(selectedMonthYear.month, selectedMonthYear.year)}</Text>
          <Ionicons name="chevron-down-outline" size={18} color="#4e342e" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
      </View>
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

        <TouchableOpacity>
          <CustomHomeScreenPieChart
            data={{
              Expense: totalExpense,
              Income: totalIncome
            }}
            selectedMonth={`${selectedMonthYear.month}-${selectedMonthYear.year}`}
          />
        </TouchableOpacity>
        
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
                  }} >
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
    <Modal
        animationType="slide"
        transparent={true}
        visible={monthYearModalVisible} // Use monthYearModalVisible here
        onRequestClose={() => {
          setMonthYearModalVisible(!monthYearModalVisible);
        }}
      >
        <View style={styles.monthYearModalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month and Year</Text>
              <MonthYearDropdown selectedMonthYear={selectedMonthYear} onMonthYearChange={handleMonthYearChange} />
              <TouchableHighlight underlayColor="#d7ccc8" style={styles.saveButton} onPress={handleCloseModal}>
                <Text style={styles.saveButtonText}>Close</Text>
              </TouchableHighlight >
          </View>
        </View>
      </Modal>

      {/* Modal for CustomDropdown Calendar */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
        <CustomDropdownCalendar
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
        </View>
      </Modal>
    </>
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
    marginBottom: 5,
  },
  noRecordsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 80,
  },
  dateButton: {
    backgroundColor: '#fefbe9', // Background color
    paddingVertical: 8, // Vertical padding
    paddingHorizontal: 12, // Horizontal padding
    borderRadius: 5, // Border radius
    flexDirection: 'row',
    alignItems: 'center', // Align items to center vertically
    justifyContent: 'center', // Center content horizontally
  },
  dateButtonText: {
    color: '#4e342e', // Text color
    fontSize: 16,
    fontWeight: 'regular',
  },
  buttonContainer: {
    padding: 4,
    alignItems: 'center', // Center the button horizontally
    marginTop: -50,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYearModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#ffb300', // Background color
    width: '65%', // Full width
    borderRadius: 5, // Rounded corners
    marginBottom: 10, // Space below the button
    alignItems: 'center', // Center text horizontally
    paddingHorizontal: 20, // Vertical padding
  },
  saveButtonText: {
    color: '#4e342e', 
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10, // Padding
  },
});

export default HomeScreen;
