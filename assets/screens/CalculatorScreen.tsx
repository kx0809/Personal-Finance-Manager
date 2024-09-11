import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CalculatorScreen = () => {
  const [display, setDisplay] = useState(""); // Display for calculator input
  const [result, setResult] = useState(null); // Final calculated result

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

  // Function to calculate the result using eval (simple expressions)
  const handleCalculate = () => {
    try {
      const calculatedResult = eval(display); // Evaluate the expression
      setResult(calculatedResult); // Set the result
    } catch (error) {
      setResult("Error"); // If an error occurs (e.g., invalid input)
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Screen */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{result !== null ? result : display || "0"}</Text>
      </View>

      {/* Calculator Buttons */}
      <View style={styles.buttonsContainer}>
        {/* First row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("/")}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("*")}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("-")}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Second row */}
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
          <TouchableOpacity style={styles.button} onPress={() => handlePress("+")}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Third row */}
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
          <TouchableOpacity style={styles.buttonEqual} onPress={handleCalculate}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>

        {/* Fourth row */}
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
          <TouchableOpacity style={styles.button} onPress={() => handlePress(".")}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
        </View>

        {/* Fifth row */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handlePress("0")}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fefbe9",
  },
  displayContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#ffffff",
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: "#d7ccc8",
    borderWidth: 1,
  },
  displayText: {
    fontSize: 40,
    color: "#4e342e",
  },
  buttonsContainer: {
    flex: 5,
    padding: 20,
    backgroundColor: "#d7ccc8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ffb300",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 60,
  },
  buttonText: {
    fontSize: 24,
    color: "#ffffff",
  },
  buttonEqual: {
    backgroundColor: "#ff7043",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 60,
  },
  zeroButton: {
    flex: 2,
    width: '100%', // Make the button span the full width
    backgroundColor: "#ffb300",
  },
  emptyButton: {
    width: 60, // Empty button to align the row properly
  },
});

export default CalculatorScreen;
