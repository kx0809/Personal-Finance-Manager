import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fefbe9', 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4e342e', 
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#d7ccc8', 
      borderRadius: 4,
      padding: 8,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#ffb300', 
      padding: 12,
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonText: {
      color: '#4e342e', 
      fontSize: 16,
      fontWeight: 'bold',
    },
    resultContainer: {
      marginTop: 16,
    },
    result: {
      fontSize: 18,
      marginBottom: 8,
      color: '#4e342e', 
    },
    rateInfo: {
      fontSize: 16,
      color: '#4e342e', 
    },
  });

export default styles;