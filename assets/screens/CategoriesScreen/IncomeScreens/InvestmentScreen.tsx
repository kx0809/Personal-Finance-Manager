import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { getDBConnection } from '../db-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatted } from '../../../components/utility';
import { readDataFromFile } from '../../../components/ExpenseIncomeData'; // Adjust import path if needed
import styles from '../../../styles/categoriesDetailsStyles';

const InvestmentScreen = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [iconData, setIconData] = useState<any>({});

  const fetchIconData = useCallback(async () => {
    try {
      const data = await readDataFromFile();
      setIconData(data.incomeData.reduce((acc: any, item: any) => {
        acc[item.name] = item.icon;
        return acc;
      }, {}));
    } catch (error) {
      console.error('Failed to fetch icon data:', error);
    }
  }, []);

  useEffect(() => {
    fetchIconData();
  }, [fetchIconData]);

  const fetchInvestmentData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const query = `SELECT * FROM IncomeExpense WHERE type = ? AND category = ?`;
      const results = await db.executeSql(query, ['Investment', 'Income']);
      const investmentData = results[0].rows.raw();

      // Group investment data by date
      const groupedData = investmentData.reduce((groups: any, item: any) => {
        const dateKey = formatted(new Date(item.date), 'yyyy-MM-dd');
        if (!groups[dateKey]) {
          groups[dateKey] = { data: [], total: 0 };
        }
        groups[dateKey].data.push(item);
        groups[dateKey].total += parseFloat(item.amount);
        return groups;
      }, {});

      const sections = Object.keys(groupedData).map(dateKey => ({
        title: dateKey,
        data: groupedData[dateKey].data,
        netTotal: groupedData[dateKey].total,
      }));

      const total = investmentData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
      setSections(sections);
      setTotalAmount(total);
    } catch (error) {
      console.error('Failed to fetch investment data:', error);
    }
  }, [fetchIconData]);

  useEffect(() => {
    fetchInvestmentData();
  }, [fetchInvestmentData]);

  const getIcon = (type: string) => {
    return iconData[type] || 'question';
  };

  const formatNetTotal = (netTotal: number) => {
    if (netTotal < 0) {
      return `- RM ${Math.abs(netTotal).toFixed(2)}`;
    }
    return `RM ${netTotal.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.totalAmountLabel}>Total Investment:</Text>
        <Text style={styles.totalAmount}>RM {totalAmount.toFixed(2)}</Text>
      </View>
      {sections.length === 0 ? (
        <Text style={styles.noData}>No income coming from investment</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section: { title, netTotal } }) => (
            <View style={styles.sectionHeaderWrapper}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionNetTotal}>{formatNetTotal(netTotal)}</Text>
              </View>
            </View>
          )}
          renderItem={({ item, index, section }) => (
            <View style={[styles.itemWrapper, 
              { 
                backgroundColor: '#e8f7ff', 
                ...(index === section.data.length - 1 ? styles.lastItemWrapper : {}) 
              }
            ]}>
              <View style={styles.details}>
                <View style={styles.item}>
                  <View style={styles.type}>
                    <Icon name={getIcon(item.type)} size={20} color="#000" />
                    <Text style={styles.itemTitle}>{item.type}</Text>
                  </View>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <Text style={styles.itemAmount}>+ RM {item.amount}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};



export default InvestmentScreen;
