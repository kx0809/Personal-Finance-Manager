import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDBConnection } from '../db-service';

const TradeScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    const fetchOtherData = async () => {
      try {
        const db = await getDBConnection();
        const query = `SELECT * FROM IncomeExpense WHERE type = ? AND category = ?`;
        const results = await db.executeSql(query, ['Trade', 'Income']);
        const tradeData = results[0].rows.raw();
        setData(tradeData);
        
        // Calculate the total amount
        const total = tradeData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Failed to fetch trade data:', error);
      }
    };

    fetchOtherData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade Data</Text>
      {data.length === 0 ? (
        <Text style={styles.noData}>No data available for Trade</Text>
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
        <Text style={styles.totalAmount}>Total Trade: RM {totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fefbe9', // Light background color for better contrast
    },
    title: {
      fontSize: 25,
      fontWeight: '600', // Slightly bolder for emphasis
      color: '#333', // Darker color for better readability
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd', // Subtle border at the bottom of the title
    },
    item: {
      backgroundColor: '#fff', // White background for items
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
      fontWeight: 'bold', // Bold for amount to stand out
      color: '#4caf50', // Green color for amount
    },
    itemDescription: {
      fontSize: 18,
      color: '#333', // Darker color for readability
      marginVertical: 4,
    },
    itemCategory: {
      fontSize: 18,
      color: '#888', // Lighter color for category
      marginVertical: 4,
    },
    itemDate: {
      fontSize: 18,
      color: '#555', // Medium gray color for date
      marginVertical: 4,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#F0FFF0',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    totalAmount: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4caf50', // Green color for total amount
    },
    noData: {
      fontSize: 18,
      color: '#888', // Lighter color for no data message
      textAlign: 'center',
      marginTop: 20,
    },
});

export default TradeScreen;
