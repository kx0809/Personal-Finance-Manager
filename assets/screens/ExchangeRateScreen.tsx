import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/exchangeRateScreenStyles';

const ExchangeRateScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/4b90b4cf5098f6ffa8876881/latest/${baseCurrency}`);
      const data = await response.json();
      if (data.conversion_rates[targetCurrency]) {
        setExchangeRate(data.conversion_rates[targetCurrency]);
        setConvertedAmount(Number(amount) * data.conversion_rates[targetCurrency]);
      } else {
        setExchangeRate(null);
        setConvertedAmount(null);
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setExchangeRate(null);
      setConvertedAmount(null);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    fetchExchangeRate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Exchange Rate Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Base Currency (e.g., MYR)"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
      />

      <TextInput
        style={styles.input}
        placeholder="Target Currency (e.g., USD, CNY, JPY)"
        value={targetCurrency}
        onChangeText={setTargetCurrency}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount (in Base Currency)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {isSubmitted && (
        <View style={styles.resultContainer}>
          {exchangeRate !== null ? (
            <>
              <Text style={styles.result}>
                {amount} {baseCurrency} = {(Number(amount) * exchangeRate).toFixed(2)} {targetCurrency}
              </Text>
              <Text style={styles.rateInfo}>
                Exchange Rate: 1 {baseCurrency} = {exchangeRate.toFixed(4)} {targetCurrency}
              </Text>
            </>
          ) : (
            <Text style={styles.result}>Exchange rate not available</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ExchangeRateScreen;
