import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fefbe9', // Light background color for better contrast
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
      color: '#4caf50', 
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
      color: '#4caf50',
    },
    noData: {
      fontSize: 18,
      color: '#888', 
      textAlign: 'center',
      marginTop: 20,
    },
});

export default styles;