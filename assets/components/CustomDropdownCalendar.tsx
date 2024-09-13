import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

// Mapping of month names to numbers
const monthMapping = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

// Function to convert date string to required format with zero-padding
const convertDateString = (dateStr) => {
  const [weekday, day, month, year] = dateStr.split(' ');
  const monthNumber = monthMapping[month];
  if (!monthNumber) {
    console.error(`Month conversion failed for: ${month}`);
    return null;
  }

  // Zero-padding for day and month
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = monthNumber;

  return `${year}-${paddedMonth}-${paddedDay}`;
};

// Function to get today's date in the required format
const getTodayDate = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

const CustomDropdownCalendar = ({ modalVisible, setModalVisible, selectedDate, onDateSelect, datesWithItems }) => {
  // Convert datesWithItems to the format required by react-native-calendars
  const markedDates = datesWithItems.reduce((acc, date) => {
    const formattedDate = convertDateString(date);
    if (formattedDate) {
      acc[formattedDate] = { marked: true, dotColor: '#ffb300' }; // Mark the date with a dot
    }
    return acc;
  }, {});

  // Mark the current date with a special color
  const todayDate = getTodayDate();
  markedDates[todayDate] = {
    ...markedDates[todayDate],
    selected: true,
    selectedColor: '#ffb300', // Change color for the current date
    selectedTextColor: 'white', // Change text color for the current date
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Icon name="close-circle" size={24} color="rgba(0,0,0,0.1)" />
      </TouchableOpacity>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={(day) => {
          const dateString = `${day.dateString.split('-').reverse().join(' ')}`; // Convert date format
          onDateSelect(dateString);
        }}
        monthFormat={'yyyy-MM'} // Ensure the correct format
        markingType={'dot'} // Specify the marking type
        theme={{
          calendarBackground: 'white',
          textSectionTitleColor: '#ffb300',
          selectedDayBackgroundColor: '#ffb300',
          selectedDayTextColor: 'white',
          todayTextColor: '#ffb300',
          dayTextColor: '#4e342e',
          arrowColor: '#ffb300', // Change color of the navigation arrows
        }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    
  },
  calendar: {
    marginTop: -20,
    width: '100%',
  },
  closeButton: {
    marginTop: 16,
    marginLeft: 275,
    position: 'absolute',
    zIndex: 100,
  },
});

export default CustomDropdownCalendar;
