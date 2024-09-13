import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  exchangeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  countryPicker: {
    marginRight: 10,
  },
  currencyText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    marginHorizontal: 10,
  },
  amountInput: {
    fontSize: 24,
    color: 'black',
    textAlign: 'right',
    flex: 1,
  },
  convertedAmount: {
    fontSize: 24,
    color: 'black',
    textAlign: 'right',
  },
  swapButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 15,
  },
  keypadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  keypadButtonText: {
    fontSize: 24,
    color: '#4e342e',
  },
});

export default styles;