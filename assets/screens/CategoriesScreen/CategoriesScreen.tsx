import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";

const App = () =>{

    //Initial state value set as 'Expense', when user open categories navigation
    //the first readers 'CategoriesTab' will display the 'Expenses' first
    const [CategoriesTab, setCategoriesTab] = useState('Expenses');

  return (
    <View style={styles.container}>
        <View style={styles.navBar}>
        <TouchableOpacity
            style={[styles.navItem, CategoriesTab === 'Expenses' && styles.activeNavItem]}
            onPress={() => setCategoriesTab('Expenses')}
        >
            <Text style={[styles.navText, CategoriesTab === 'Expenses' && styles.activeNavText]}>
            Expenses
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.navItem, CategoriesTab === 'Income' && styles.activeNavItem]}
            onPress={() => setCategoriesTab('Income')}
        >
            <Text style={[styles.navText, CategoriesTab === 'Income' && styles.activeNavText]}>
            Income
            </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 12,
      backgroundColor: '#eba234',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    navItem: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    navText: {
      fontSize: 18,
      color: '#333',
    },
    activeNavItem: {
        backgroundColor: '#ffb300', // background color when user click on it
        borderColor: '#000000',
      },
      activeNavText: {
        color: '#000000',
      },
  });

export default App;
