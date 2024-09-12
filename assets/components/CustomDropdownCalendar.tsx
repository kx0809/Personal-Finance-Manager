import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // For date formatting

const CustomDropdownCalendar = ({ modalVisible, setModalVisible, selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || moment().format('YYYY-MM-DD'));

  useEffect(() => {
    if (!selectedDate) {
      onDateSelect(currentDate); // Automatically select today's date if no date is selected
    }
  }, [selectedDate, currentDate, onDateSelect]);

  const handleDayPress = (day) => {
    onDateSelect(day.dateString);
    setCurrentDate(day.dateString);
    setModalVisible(false); // Close the modal when a date is selected
  };

  const formattedDate = moment(currentDate).format('DD MMMM YYYY'); // Format the date as '11 August 2024'

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)} // Handle back button on Android
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background to cover the screen
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1, // Ensure calendar container is above overlay
  },
  calendar: {
    width: 320,
    height: 350,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#4e342e',
    backgroundColor: '#ffb300',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
});

export default CustomDropdownCalendar;
