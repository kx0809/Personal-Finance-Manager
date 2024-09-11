import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fefbe9',  
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#4e342e',  
    },
    input: {
      marginTop: 10,
      height: 40,
      borderColor: '#ccc',  
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      color: '#4e342e',  
      backgroundColor: '#ffffff',  
      borderRadius: 5,
      width: '90%',
    },
    messageInput: {
      height: 100,  
    },
    button: {
      backgroundColor: '#ffb300',  
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 60,
      width: '90%',
    },
    buttonText: {
      color: '#FFFFFF',  
      fontSize: 16,
    },
  });

  export default styles;