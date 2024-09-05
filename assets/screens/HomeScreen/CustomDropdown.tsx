import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // For date formatting

const CustomDropdown = ({ selectedDate, onDateSelect }) => {
  const [modalVisible, setModalVisible] = useState(true); // Modal is initially visible
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: '#ffb300',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#4e342e',
    marginRight: 10,
  },
  icon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  },
});

export default CustomDropdown;
