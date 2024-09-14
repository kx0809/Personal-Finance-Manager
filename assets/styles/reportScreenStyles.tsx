import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#f5f5f5', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', 
    },
    pickerWrapper: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', 
        backgroundColor: '#fff', 
        borderRadius: 8,
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#333', 
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff', 
    },
});

export default styles;
