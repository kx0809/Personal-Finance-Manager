import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { getDBConnection, getExpenditureById, deleteExpenditure } from '../db-service';
import { formatted } from '../utility'; // Import your utility function

const actions = [
  {
    text: 'Edit',
    color: '#ffb300',
    icon: require('../icons/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#ffb300',
    icon: require('../icons/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];

const ViewScreen = ({ route, navigation }) => {
  const [expenditure, setExpenditure] = useState(null);

  useEffect(() => {
    const fetchExpenditure = async () => {
      const result = await getExpenditureById(await getDBConnection(), route.params.id);
      setExpenditure(result);
    };

    fetchExpenditure();
  }, []);

  const _delete = () => {
    Alert.alert('Confirm to delete?', expenditure?.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: async () => {
          await deleteExpenditure(await getDBConnection(), route.params.id);
          route.params.refresh();
          navigation.goBack();
        },
      },
    ]);
  };

  if (!expenditure) {
    return <Text>Loading...</Text>;
  }

  const formattedDate = formatted(new Date(expenditure.date));

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{expenditure.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{expenditure.amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{expenditure.description}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{expenditure.category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
      </ScrollView>
      <FloatingAction
        actions={actions}
        color={'#ffb300'}
        onPressItem={type => {
          switch (type) {
            case 'edit':
              navigation.navigate('EditScreen', {
                id: expenditure.id,
                headerTitle: expenditure.type,
                refresh: route.params.refresh,
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#ffb300',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
});

export default ViewScreen;
