import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, TouchableWithoutFeedback, Modal, FlatList, Text} from 'react-native';
import {InputWithLabel, AppButton} from '../UI';
import { getDBConnection, updateExpenditure, getExpenditureById } from '../db-service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const expensesData = [
  { id: '1', name: 'Food', icon: 'cutlery' },
  { id: '2', name: 'Transport', icon: 'bus' },
  { id: '3', name: 'Shopping', icon: 'shopping-cart' },
  { id: '4', name: 'Rent', icon: 'home' },
  { id: '5', name: 'Bills', icon: 'file-text' },
  { id: '6', name: 'Entertainment', icon: 'music' },
];

const EditScreen = ({route, navigation} : any )  => {

    const[expenditureId, setExpenditureId] = useState(route.params.id);
    const[type, setType] = useState('');
    const[amount, setAmount] = useState('');
    const[description, setDescription] = useState('');
    const [isPickerOpen, setPickerOpen] = useState(false); // Manage type picker modal

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

    const openTypePicker = () => {
        setPickerOpen(true);
    };

    const selectType = (selectedType: string) => {
        setType(selectedType);
        setPickerOpen(false);
    };

    return (
      <View style={styles.container}>
        <ScrollView>

        {/* Type Picker */}
        <TouchableWithoutFeedback onPress={openTypePicker}>
          <View>
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'Type'}
              placeholder={'Select type'}
              value={type}
              editable={false} // Prevent manual editing, only allow picking from modal
            />
          </View>
        </TouchableWithoutFeedback>

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

        {/* Type Picker Modal */}
        <Modal
          visible={isPickerOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setPickerOpen(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={expensesData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={() => selectType(item.name)}>
                    <View style={styles.typeOption}>
                      <FontAwesome name={item.icon} size={24} color="#4e342e" />
                      <Text style={styles.typeText}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
          </View>
        </Modal>
        
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 10,
    padding: 20,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  typeText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#4e342e',
  },
});

export default EditScreen;
