import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {InputWithLabel, AppButton} from '../UI';
import { getDBConnection, updateExpenditure, getExpenditureById } from '../db-service';

const EditScreen = ({route, navigation} : any )  => {

    const[expenditureId, setExpenditureId] = useState(route.params.id);
    const[type, setType] = useState('');
    const[amount, setAmount] = useState('');
    const[description, setDescription] = useState('');

    const _query = async () => {
        const result = await getExpenditureById(await getDBConnection(), expenditureId);
        setType(result.type);
        setAmount(result.amount);
        setDescription(result.description);
    }

    useEffect(()=>{
      _query();
    },[]);

    const _update = async () => {
        await updateExpenditure(await getDBConnection(), type, amount, description, expenditureId);
        route.params.refresh(expenditureId);
        route.params.homeRefresh();
        navigation.goBack();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
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
            onPress={_update}
          />
        </ScrollView>
      </View>
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
export default EditScreen;