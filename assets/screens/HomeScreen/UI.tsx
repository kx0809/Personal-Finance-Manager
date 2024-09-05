import React from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';


/**
 * InputWithLabel
 */
export const InputWithLabel = ( props: any ) => {

  const orientationDirection = (props.orientation == 'horizontal') ? 'row': 'column';

  return (
    <View style={[inputStyles.container, {flexDirection: orientationDirection}]}>
      <Text style={inputStyles.label}>{props.label}</Text>
      <TextInput
        style={[inputStyles.input, props.style]}
        {...props}
      />
    </View>
  );
}


/**
 * AppButton
 */
export const AppButton = ( props: any ) => {

  let backgroundColorTheme = '';

  if(props.theme) {
      switch(props.theme) {
          case 'success':
              backgroundColorTheme = '#449d44';
              break;
          case 'info':
              backgroundColorTheme = '#31b0d5';
              break;
          case 'warning':
              backgroundColorTheme = '#ec971f';
              break;
          case 'danger':
              backgroundColorTheme = '#c9302c';
              break;
          case 'primary':
              backgroundColorTheme = '#ffb300';
              break;
          default:
              backgroundColorTheme = '#286090';
      }
  }
  else {
      backgroundColorTheme = '#286090';
  }

  return (
      <TouchableNativeFeedback
          onPress={props.onPress}
          onLongPress={props.onLongPress}
      >
          <View style={[buttonStyles.button, {backgroundColor: backgroundColorTheme}]}>
              <Text style={buttonStyles.buttonText}>{props.title}</Text>
          </View>
      </TouchableNativeFeedback>
  )
}


const buttonStyles = StyleSheet.create({
  button: {
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    padding: 20,
    fontSize: 20,
    color: 'white',
  },
});

const inputStyles = StyleSheet.create({
  container: {
    height: 100,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  input: {
    flex: 3,
    fontSize: 20,
    color: 'blue',
  },
});