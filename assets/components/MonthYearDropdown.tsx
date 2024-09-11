import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const months = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const years = Array.from({ length: 50 }, (_, index) => `${new Date().getFullYear() - index}`);

const MonthYearDropdown = ({ selectedMonthYear, onMonthYearChange }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(selectedMonthYear.month || '1');
  const [selectedYear, setSelectedYear] = useState(selectedMonthYear.year || years[0]);

  useEffect(() => {
    loadMonthYearData();
  }, []);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    onMonthYearChange({ month, year: selectedYear });
    handleSave(month, selectedYear);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    onMonthYearChange({ month: selectedMonth, year });
    handleSave(selectedMonth, year);
  };

  const handleSave = async (month: string, year: string) => {
    try {
      await AsyncStorage.setItem('Month', month);
      await AsyncStorage.setItem('Year', year);
      console.log('Month and Year saved successfully:', month, year); // Log success message
    } catch (error) {
      console.error('Failed to save the month and year:', error); // Log error
    }
  };

  const loadMonthYearData = async () => {
    try {
      const savedMonth = await AsyncStorage.getItem('Month');
      const savedYear = await AsyncStorage.getItem('Year');
      console.log('Loaded Month:', savedMonth); // Log the loaded month
      console.log('Loaded Year:', savedYear); // Log the loaded year

      if (savedMonth !== null && savedYear !== null) {
        setSelectedMonth(savedMonth);
        setSelectedYear(savedYear);
        onMonthYearChange({ month: savedMonth, year: savedYear });
      }
    } catch (error) {
      console.error('Failed to load the month and year:', error); // Log error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Month</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={handleMonthChange}
          style={styles.picker}
        >
          {months.map((month) => (
            <Picker.Item key={month.value} label={month.label} value={month.value} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Select Year</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={handleYearChange}
          style={styles.picker}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerWrapper: {
    width: 200, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 20,
  },
  picker: {
    width: '100%', 
  },
});

export default MonthYearDropdown;
