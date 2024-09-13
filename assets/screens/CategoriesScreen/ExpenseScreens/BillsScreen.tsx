import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDBConnection } from '../db-service';
import styles from '../../../styles/expenseDetailsStyles';

const BillsScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    const fetchBillsData = async () => {
      try {
        const db = await getDBConnection();
        const query = `SELECT * FROM IncomeExpense WHERE type = ? AND category = ?`;
        const results = await db.executeSql(query, ['Bills', 'Expense']);
        const billsData = results[0].rows.raw();
        setData(billsData);
        
        // Calculate the total amount
        const total = billsData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Failed to fetch bill data:', error);
      }
    };

    fetchBillsData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses for bills</Text>
      {data.length === 0 ? (
        <Text style={styles.noData}>No expenses for bills</Text>
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
        <Text style={styles.totalAmount}>Total Bills: RM {totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default BillsScreen;
