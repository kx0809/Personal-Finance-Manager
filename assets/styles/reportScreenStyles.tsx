import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', 
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
        textAlign: 'center',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4e342e', 
    },
    picker: {
        marginTop: 25,
        height: 50,
        width: '60%',
        marginBottom: 30,
        backgroundColor: '#d7ccc8', 
        textAlign: 'center',
        marginLeft: 70,
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