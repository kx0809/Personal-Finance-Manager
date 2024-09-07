import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const months = [
  { label: 'January', value: '0' },
  { label: 'February', value: '1' },
  { label: 'March', value: '2' },
  { label: 'April', value: '3' },
  { label: 'May', value: '4' },
  { label: 'June', value: '5' },
  { label: 'July', value: '6' },
  { label: 'August', value: '7' },
  { label: 'September', value: '8' },
  { label: 'October', value: '9' },
  { label: 'November', value: '10' },
  { label: 'December', value: '11' },
];

const years = Array.from({ length: 50 }, (_, index) => `${new Date().getFullYear() - index}`);

const MonthYearDropdown = ({ selectedMonthYear, onMonthYearChange }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(selectedMonthYear.month || '0');
  const [selectedYear, setSelectedYear] = useState(selectedMonthYear.year || years[0]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    onMonthYearChange({ month, year: selectedYear });
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    onMonthYearChange({ month: selectedMonth, year });
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
