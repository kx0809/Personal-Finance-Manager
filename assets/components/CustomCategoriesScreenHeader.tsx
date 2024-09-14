import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ onMenuPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuIcon}>
        <Ionicons name="menu" size={24} color="#4e342e" />
      </TouchableOpacity>
      <Text style={styles.headerText}>
        Categories
      </Text>
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
    width: '110%',
    top: 0,
    marginLeft: -17,
    marginTop: -5,
    height: 60,
  },
  menuIcon: {
    marginTop: 5,
    padding: 5,
  },
  headerText: {
    fontSize: 26,  
    color: '#4e342e',
    marginTop: 5,
    marginRight: 115,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
