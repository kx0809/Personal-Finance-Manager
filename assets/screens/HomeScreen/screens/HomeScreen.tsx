import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import { getDBConnection, getExpenditures } from '../db-service';

const actions = [
  {
    text: 'Add',
    icon: require('../icons/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

const HomeScreen = ({ route, navigation }: any) => {
  const [expenditures, setExpenditures] = useState<any>([]);

  const _query = async () => {
    setExpenditures(await getExpenditures(await getDBConnection()));
  };

  useEffect(() => {
    _query();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={expenditures}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }: any) => (
          <TouchableHighlight
            underlayColor="#d7ccc8"
            onPress={() => {
              navigation.navigate('ViewScreen', {
                id: item.id,
                headerTitle: item.name,
                refresh: _query,
              });
            }}>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.type}</Text>
              <Text style={styles.itemSubtitle}>{item.amount}</Text>
              <Text style={styles.itemSubtitle}>{item.description}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        color={'#ffb300'}
        onPressItem={() => {
          navigation.navigate('CreateScreen', {
            refresh: _query,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 18,
  },
});

export default HomeScreen;
