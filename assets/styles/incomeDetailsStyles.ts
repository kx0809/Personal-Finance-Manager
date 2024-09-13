import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  noData: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 80,
  },
  sectionHeaderWrapper: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  sectionHeader: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4e342e',
  },
  sectionNetTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffb300',
  },
  itemWrapper: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  lastItemWrapper: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  item: {
    flexDirection: 'column',
    paddingVertical: 10,
    flex: 1,
  },
  type: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  itemDescription: {
    fontSize: 17,
    marginLeft: 10,
  },
  itemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  footer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e342e',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffb300',
  },
});

export default styles;