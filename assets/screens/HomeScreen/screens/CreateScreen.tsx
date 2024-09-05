import React, { useEffect, useState } from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {InputWithLabel, AppButton} from '../UI';
import { LogBox } from 'react-native';
import { getDBConnection, createExpenditure } from '../db-service';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const CreateScreen = ({route, navigation} : any ) => {

    const[type, setType] = useState('');
    const[amount, setAmount] = useState('');
    const[description, setDescription] = useState('');

    useEffect(()=>{
        navigation.setOptions({headerTitle: 'Add New Expenditure'});
    },[]);

    const _insert = async () => {
        await createExpenditure(await getDBConnection(),type, amount, description);
        route.params.refresh();
        navigation.goBack();
    }

    return (
      <ScrollView style={styles.container}>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Type'}
          placeholder={'Enter type here'}
          value={type}
          onChangeText={(type:any) => {
            setType(type);
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Enter amount here'}
          label={'Amount'}
          value={amount}
          onChangeText={(amount:any) => {
            setAmount(amount);
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Enter description here'}
          label={'Description'}
          value={description}
          onChangeText={(description:any) => {
            setDescription(description);
          }}
          orientation={'vertical'}
        />

        <AppButton
          style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={_insert}
        />
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },
  TextInput: {
    fontSize: 24,
    color: '#000099',
  },
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

export default CreateScreen;