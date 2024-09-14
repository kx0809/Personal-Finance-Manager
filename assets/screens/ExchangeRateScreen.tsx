import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/exchangeRateScreenStyles';

const ExchangeRateScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState('MYR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [baseCountryCode, setBaseCountryCode] = useState<CountryCode>('MY');
  const [targetCountryCode, setTargetCountryCode] = useState<CountryCode>('US');
  const [amount, setAmount] = useState('');  
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null); 
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);  

  // Function to fetch exchange rate from the API
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/4b90b4cf5098f6ffa8876881/latest/${baseCurrency}`);
      const data = await response.json();

      // If exchange rate exists for the selected target currency, update the exchange rate and converted amount
      if (data.conversion_rates[targetCurrency]) {
        setExchangeRate(data.conversion_rates[targetCurrency]);
        setConvertedAmount(Number(amount) * data.conversion_rates[targetCurrency]);
      } else {
        // Set to null when the target currency is not supported from the api
        setExchangeRate(null);
        setConvertedAmount(null);
      }
    } catch (error) {
      // Log and reset data if there's an error during the API call
      console.error('Error fetching exchange rate:', error);
      setExchangeRate(null);
      setConvertedAmount(null);
    }
  };

  // Handle user keypress to input the amount
  const handleKeyPress = (key: string) => {
    setAmount((prevAmount) => (prevAmount + key));
  };

  // Handle deletion of the last entered character
  const handleDelete = () => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  };

  // Handle selection of the base currency's country and currency code
  const handleBaseCountryChange = (country: { cca2: CountryCode; currency: string[] }) => {
    setBaseCountryCode(country.cca2);
    setBaseCurrency(country.currency[0]);
  };

  // Handle selection of the target currency's country and currency code
  const handleTargetCountryChange = (country: { cca2: CountryCode; currency: string[] }) => {
    setTargetCountryCode(country.cca2);
    setTargetCurrency(country.currency[0]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <LinearGradient colors={['#ffb300', '#fefbe9']} style={styles.container}>
        <View style={styles.exchangeContainer}>
          {/* Base currency selection and amount input */}
          <View style={styles.currencyRow}>
            <CountryPicker
              countryCode={baseCountryCode}
              withFilter
              withFlag
              withCurrency
              onSelect={handleBaseCountryChange}
              containerButtonStyle={styles.countryPicker}
            />
            <Text style={styles.currencyText}>{baseCurrency}</Text>
            <Text style={styles.amountInput}>{amount}</Text>
          </View>

          {/* Button to fetch exchange rate */}
          <TouchableOpacity style={styles.swapButton} onPress={fetchExchangeRate}>
            <Icon name="swap-vertical" size={30} color="black" />
          </TouchableOpacity>

          {/* Target currency and display of converted amount */}
          <View style={styles.currencyRow}>
            <CountryPicker
              countryCode={targetCountryCode}
              withFilter
              withFlag
              withCurrency
              onSelect={handleTargetCountryChange}
              containerButtonStyle={styles.countryPicker}
            />
            <Text style={styles.currencyText}>{targetCurrency}</Text>
            <Text style={styles.convertedAmount}>
              {convertedAmount !== null ? convertedAmount.toFixed(2) : '0'}
            </Text>
          </View>
        </View>

        {/* Keypad for entering the amount */}
        <View style={styles.keypadContainer}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((key) => (
            <TouchableOpacity key={key} style={styles.keypadButton} onPress={() => handleKeyPress(key)}>
              <Text style={styles.keypadButtonText}>{key}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.keypadButton} onPress={handleDelete}>
            <Icon name="backspace" size={30} color="#4e342e" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ExchangeRateScreen;
