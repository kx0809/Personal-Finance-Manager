import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDropdown = ({ selectedDate, onDateSelect }: { selectedDate: string, onDateSelect: (day: any) => void }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: any) => {
    onDateSelect(day); 
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.button]} // Ensure button color is set
      >
        <Text style={styles.buttonText}>{selectedDate}</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#4e342e" style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: '#ffb300' },
              }}
              theme={{
                todayTextColor: '#ffb300',
                arrowColor: '#ffb300',
                textSectionTitleColor: '#4e342e',
                monthTextColor: '#4e342e',
                selectedDayBackgroundColor: '#ffb300',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: '#ffb300',
    marginLeft: 50,

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background for modal
    
  },
  calendarContainer: {
    borderRadius: 10, // Apply border radius to the calendar container
    overflow: 'hidden',
    marginHorizontal: 35,
  },
});

export default CustomDropdown;
