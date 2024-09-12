import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ onMenuPress, onCalendarPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuIcon}>
        <Ionicons name="menu" size={24} color="#4e342e" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCalendarPress} style={styles.calendarIcon}>
        <Ionicons name="calendar" size={30} color="#4e342e" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffb300',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  menuIcon: {
    padding: 5,
    marginLeft: -6,
  },
  calendarIcon: {
    padding: 5,
  },
});

export default CustomHeader;
