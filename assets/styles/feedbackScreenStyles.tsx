import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fefbe9',  
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#4e342e',  
    },
    input: {
      height: 40,
      borderColor: '#d7ccc8',  
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      color: '#4e342e',  
      backgroundColor: '#ffffff',  
    },
    messageInput: {
      height: 100,  
    },
    button: {
      backgroundColor: '#ffb300',  
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',  
      fontSize: 16,
    },
  });

  export default styles;