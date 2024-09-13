import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDBConnection } from '../db-service';
import styles from '../../../styles/incomeDetailsStyles';

const IncomeRentScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    const fetchIncomeRentData = async () => {
      try {
        const db = await getDBConnection();
        const query = `SELECT * FROM IncomeExpense WHERE type = ? AND category = ?`;
        const results = await db.executeSql(query, ['IncomeRent', 'Income']);
        const incomeRentData = results[0].rows.raw();
        setData(incomeRentData);
        
        // Calculate the total amount
        const total = incomeRentData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Failed to fetch incomeRent data:', error);
      }
    };

    fetchIncomeRentData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income from incoming rent</Text>
      {data.length === 0 ? (
        <Text style={styles.noData}>No income coming from incoming rent</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemDate}>Date: {new Date(item.date).toLocaleDateString()}</Text>
              <Text style={styles.itemAmount}>Amount: RM {item.amount}</Text>
              <Text style={styles.itemCategory}>Category: {item.category}</Text>
              <Text style={styles.itemDescription}>Description: {item.description}</Text>
            </View>
          )}
        />
      )}
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>Total IncomeRent: RM {totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};


export default IncomeRentScreen;
