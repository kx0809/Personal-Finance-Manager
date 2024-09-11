import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDBConnection } from 'D:/AsmApp/assets/screens/HomeScreen/db-service'; 

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
      <Text style={styles.title}>Bills Data</Text>
      {data.length === 0 ? (
        <Text style={styles.noData}>No data available for bills</Text>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fefbe9', 
    },
    title: {
      fontSize: 25,
      fontWeight: '600',
      color: '#333', 
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd', // Subtle border at the bottom of the title
    },
    item: {
      backgroundColor: '#fff', 
      borderRadius: 8, // Rounded corners for each item
      shadowColor: '#000', // Shadow for subtle depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // For Android shadow
      marginBottom: 16,
      padding: 16,
    },
    itemAmount: {
      fontSize: 20,
      fontWeight: 'bold', 
      color: '#FF0000',
    },
    itemDescription: {
      fontSize: 18,
      color: '#333', 
      marginVertical: 4,
    },
    itemCategory: {
      fontSize: 18,
      color: '#888', 
      marginVertical: 4,
    },
    itemDate: {
      fontSize: 18,
      color: '#555', 
      marginVertical: 4,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFCCCC',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    totalAmount: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#FF0000', 
    },
    noData: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
});

export default BillsScreen;
