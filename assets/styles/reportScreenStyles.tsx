import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#f5f5f5', // light grey background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', // dark text color for better readability
    },
    pickerWrapper: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // light border for the picker
        backgroundColor: '#fff', // white background for the picker
        borderRadius: 8,
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#333', // dark text color for better readability
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff', // ensure background is consistent
    },
});

export default styles;
