import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'; // For date formatting

const CustomDropdown = ({ selectedDate, onDateSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate || moment().format('YYYY-MM-DD'));

  useEffect(() => {
    if (!selectedDate) {
      onDateSelect(currentDate); // Automatically select today's date if no date is selected
    }
  }, [selectedDate, currentDate, onDateSelect]);

  const handleDayPress = (day) => {
    onDateSelect(day.dateString);
    setCurrentDate(day.dateString);
    setModalVisible(false);
  };

  const formattedDate = moment(currentDate).format('DD MMMM YYYY'); // Format the date as '11 August 2024'

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.button]}
      >
        <Text style={styles.buttonText}>{formattedDate}</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#4e342e" style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Text style={styles.selectedDateText}>
              {formattedDate}
            </Text>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [currentDate]: { selected: true, marked: true, selectedColor: '#ffb300' },
              }}
              theme={{
                todayTextColor: '#ffb300',
                arrowColor: '#ffb300',
                textSectionTitleColor: '#4e342e',
                monthTextColor: '#4e342e',
                selectedDayBackgroundColor: '#ffb300',
              }}
              current={currentDate}
              style={styles.calendar} // Adding the calendar style
            />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Keep the row direction for icon and text
    alignItems: 'center', // Vertically center the text and icon
    justifyContent: 'center', // Horizontally center the text and icon
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: '#ffb300',
    alignSelf: 'center', // Center the button horizontally in its container
  },
  buttonText: {
    fontSize: 18,
    color: '#4e342e', // Text color  
    marginRight: 10,
  },
  icon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  calendarContainer: {
    backgroundColor: '#fff', // Background color for the calendar container
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    padding: 15, // Add padding around the calendar
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    width: 320, // Fixed width for the calendar
    height: 350, // Fixed height for the calendar
  },
  selectedDateText: {
    fontSize: 16,
    color: '#4e342e',
    backgroundColor: '#ffb300', // Background color for the date
    paddingVertical: 8, // Padding for the date text
    paddingHorizontal: 12, // Horizontal padding
    borderRadius: 5, // Border radius for rounded corners
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6, // Space between the text and the calendar
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ffb300',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#4e342e',
    fontWeight: 'bold',
  },
});

export default CustomDropdown;
