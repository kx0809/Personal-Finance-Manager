import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import io from "socket.io-client";
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient


const CalculatorScreen = () => {
  const [display, setDisplay] = useState(""); // Display for calculator input
  const [result, setResult] = useState(null); // Final calculated result
  const [socket, setSocket] = useState(null); // Socket.IO client instance

  useEffect(() => {
    // Initialize WebSocket connection
    const socketInstance = io('http://10.0.2.2:5001/calculator'); // Update with your server address
    setSocket(socketInstance);

    // Handle connection event
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Handle server response
    socketInstance.on('server_send', (data) => {
      const parsedData = JSON.parse(data);
      setResult(parsedData.result);
    });

    // Handle errors
    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to handle number and operator presses
  const handlePress = (value) => {
    if (result !== null && ['+', '-', '*', '/'].includes(value)) {
      // Continue calculation based on result if an operator is pressed
      setDisplay(result.toString() + value);
      setResult(null);
    } else if (result !== null) {
      // If a result is already shown, and a number is pressed, start new calculation
      setDisplay(value);
      setResult(null);
    } else {
      setDisplay(display + value); // Append pressed value to display
    }
  };

  // Function to clear the display
  const handleClear = () => {
    setDisplay("");
    setResult(null);
  };

  // Function to calculate the result using WebSocket
  const handleCalculate = () => {
    try {
      const [number1, operation, number2] = display.split(/([+\-*/])/);
      if (!number1 || !number2 || !operation) {
        setResult("Error");
        return;
      }
      const data = {
        number1: parseFloat(number1),
        number2: parseFloat(number2),
        operation: getOperation(operation),
      };

      // Send data to the WebSocket server
      if (socket) {
        socket.emit('client_send', data);
      }
    } catch (error) {
      setResult("Error");
    }
  };

  // Function to convert operation symbol to WebSocket operation
  const getOperation = (op) => {
    switch (op) {
      case '+':
        return 'add';
      case '-':
        return 'subtract';
      case '*':
        return 'multiply';
      case '/':
        return 'divide';
      default:
        return '';
    }
  };

  return (
    <LinearGradient
      colors={['#ffb300', '#fefbe9']} // Define gradient colors similar to the image
      style={styles.container}
    >
      {/* Top Section - Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{result !== null ? result : display || "0"}</Text>
        <Text style={styles.subText}>{display}</Text>
      </View>

      {/* Calculator Buttons */}
      <View style={styles.buttonsContainer}>
        {/* First Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("%")}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("/")}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("*")}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("7")}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("8")}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("9")}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("-")}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Third Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("4")}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("5")}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("6")}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("+")}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Fourth Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("1")}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("2")}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("3")}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonEqual} onPress={handleCalculate}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>

        {/* Fifth Row */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handlePress("0")}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(".")}>
            <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  displayText: {
    fontSize: 60,
    color: "#ffffff",
  },
  subText: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.7)",
  },
  buttonsContainer: {
    flex: 5,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  buttonText: {
    fontSize: 28,
    color: "#4e342e",
  },
  buttonEqual: {
    backgroundColor: "#FF7043",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  zeroButton: {
    flex: 2,
    width: '100%',
  },
});

export default CalculatorScreen;


