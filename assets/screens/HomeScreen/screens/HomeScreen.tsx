import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDBConnection, getExpenditures } from '../db-service';

// Define your expense and income data
const expensesData = [
  { id: '1', name: 'Food', icon: 'cutlery' },
  { id: '2', name: 'Transport', icon: 'bus' },
  { id: '3', name: 'Shopping', icon: 'shopping-cart' },
  { id: '4', name: 'Rent', icon: 'home' },
  { id: '5', name: 'Bills', icon: 'file-text' },
  { id: '6', name: 'Entertainment', icon: 'music' },
];

const incomeData = [
  { id: '1', name: 'Salary', icon: 'money' },
  { id: '2', name: 'Bonus', icon: 'gift' },
  { id: '3', name: 'Rebate', icon: 'percent' },
  { id: '4', name: 'Trade', icon: 'exchange' },
  { id: '5', name: 'Dividend', icon: 'line-chart' },
  { id: '6', name: 'Rent', icon: 'home' },
  { id: '7', name: 'Investment', icon: 'home' },
  { id: '8', name: 'Other', icon: 'home' },
  { id: '9', name: 'Income', icon: 'home' },
];

const actions = [
  {
    text: 'Add',
    icon: require('../icons/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

const HomeScreen = ({ route, navigation }: any) => {
  const [expenditures, setExpenditures] = useState<any>([]);

  const _query = async () => {
    setExpenditures(await getExpenditures(await getDBConnection()));
  };

  useEffect(() => {
    _query();
  }, []);

  const getBackgroundColor = (type: string) => {
    return type === 'Expense' ? '#ffe8e8' : '#e8f7ff'; // Change background color based on type
  };

  const getIcon = (type: string, category: string) => {
    const data = category === 'Expense' ? expensesData : incomeData;
    const item = data.find((item) => item.name === type);
    return item ? item.icon : 'question'; // Default icon if type is not found
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenditures}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }: any) => (
          <TouchableHighlight
            underlayColor="#d7ccc8"
            onPress={() => {
              navigation.navigate('ViewScreen', {
                id: item.id,
                headerTitle: item.type,
                refresh: _query,
              });
            }}>
            <View style={[styles.item, { backgroundColor: getBackgroundColor(item.category) }]}>
              <Icon name={getIcon(item.type, item.category)} size={24} color="#000" />
              <Text style={styles.itemTitle}>{item.type}</Text>
              <Text style={styles.itemSubtitle}>{item.amount}</Text>
              <Text style={styles.itemSubtitle}>{item.description}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        color={'#ffb300'}
        onPressItem={() => {
          navigation.navigate('CreateScreen', {
            refresh: _query,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  itemSubtitle: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default HomeScreen;
