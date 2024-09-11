import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefbe9', 
    },
    page: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4e342e', 
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4e342e', 
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#d7ccc8', 
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noData: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#4e342e', 
    },
});

export default styles;