import React, { useState, useEffect } from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { InputWithLabel } from '../UI';
import {FloatingAction} from 'react-native-floating-action';
import { getDBConnection, getExpenditureById, deleteExpenditure } from '../db-service';

const actions = [
  {
    text: 'Edit',
    color: '#c80000',
    icon: require('../icons/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#c80000',
    icon: require('../icons/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];

const ViewScreen = ({route, navigation} : any ) => {

    const [expenditureId, setExpenditureId] = useState(route.params.id);
    const [expenditure, setExpenditure] = useState<any>(null);

    const _queryByID = async (id: any) => {
      setExpenditure(await getExpenditureById(await getDBConnection(), id));
    }

    const _delete = () => {
    Alert.alert('Confirm to delete ?', expenditure.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: async () => {
            await deleteExpenditure(await getDBConnection(), expenditureId)
            route.params.refresh();
            navigation.goBack();
        },
      },
    ]);
  }

    useEffect(()=>{
      _queryByID(expenditureId);
    },[]);

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Type'}
            value={expenditure ? expenditure.type : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Amount'}
            value={expenditure ? expenditure.amount : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Description'}
            value={expenditure ? expenditure.description : ''}
            orientation={'vertical'}
            editable={false}
          />
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#a80000'} //   floatingIcon={( //     <Image //       source={require('./images/baseline_edit_white_18dp.png')} //     /> //   )}
          onPressItem={type => {
            switch (type) {
              case 'edit':
                navigation.navigate('EditScreen', {
                  id: expenditure ? expenditure.id : 0,
                  headerTitle: expenditure ? expenditure.type : '',
                  refresh: _queryByID,
                  homeRefresh: route.params.refresh,
                });
                break;
              case 'delete':
                _delete();
                break;
            }
          }}
        />
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
    color: 'black',
  },

});

export default ViewScreen;