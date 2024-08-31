import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#fefbe9',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#d7ccc8',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    passcodeButton: {
        backgroundColor: '#d7ccc8',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#4e342e',
    },
    switch: {
        marginLeft: 10,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        paddingVertical: 20,
    },
    socialIcon: {
        fontSize: 30,
        color: '#4e342e',
        marginHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fefbe9',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    passcodeInput: {
        width: '100%',
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'red'
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;
