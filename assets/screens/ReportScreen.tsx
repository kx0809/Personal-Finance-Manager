import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PagerView from 'react-native-pager-view';
import { getDBConnection, getMonthlyExpenditures, getMonthlyIncome } from '../components/db-service'; 
import CustomPieChart from '../components/CustomPieChart'; 
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import styles from '../styles/reportScreenStyles';

const formatMonth = (month: string) => {
    const [year, monthIndex] = month.split('-');
    const date = new Date(Number(year), Number(monthIndex) - 1); 
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
};

const ReportScreen = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [monthsWithExpenditure, setMonthsWithExpenditure] = useState<string[]>([]);
    const [monthsWithIncome, setMonthsWithIncome] = useState<string[]>([]);
    const [monthlyExpenditures, setMonthlyExpenditures] = useState<any>({});
    const [monthlyIncome, setMonthlyIncome] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const db = await getDBConnection();
            const expenditureData = await getMonthlyExpenditures(db);
            const incomeData = await getMonthlyIncome(db);

            const availableExpenditureMonths = Object.keys(expenditureData);
            const availableIncomeMonths = Object.keys(incomeData);

            if (availableExpenditureMonths.length > 0 || availableIncomeMonths.length > 0) {
                setMonthsWithExpenditure(availableExpenditureMonths);
                setMonthsWithIncome(availableIncomeMonths);
                setMonthlyExpenditures(expenditureData);
                setMonthlyIncome(incomeData);
                const currentMonth = getCurrentMonth();

                if (availableExpenditureMonths.includes(currentMonth) || availableIncomeMonths.includes(currentMonth)) {
                    setSelectedMonth(currentMonth);
                } else {
                    setSelectedMonth(availableExpenditureMonths[0] || availableIncomeMonths[0]);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch the data every time the screen is focused
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchData();  // Trigger data fetch when the screen is focused
        }, [])
    );

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#ffb300" style={styles.loader} />;
    }

    const ExpenditureScreen = () => {
        const totalExpenditure = Object.values(monthlyExpenditures[selectedMonth] || {}).reduce((acc: number, value: number) => acc + value, 0);

        return (
            <ScrollView contentContainerStyle={styles.page}>
                <Text style={styles.title}>Monthly Expenditures</Text>
                <Text style={styles.totalAmount}>Total Amount: RM {totalExpenditure.toFixed(2)}</Text>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => handleMonthChange(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    {monthsWithExpenditure.map((month) => (
                        <Picker.Item
                            key={month}
                            label={formatMonth(month)}
                            value={month}
                            color="#4e342e" 
                        />
                    ))}
                </Picker>
                <CustomPieChart
                    data={monthlyExpenditures[selectedMonth]}
                    selectedMonth={selectedMonth}
                />
            </ScrollView>
        );
    };

    const IncomeScreen = () => {
        const totalIncome = Object.values(monthlyIncome[selectedMonth] || {}).reduce((acc: number, value: number) => acc + value, 0);

        return (
            <ScrollView contentContainerStyle={styles.page}>
                <Text style={styles.title}>Monthly Income</Text>
                <Text style={styles.totalAmount}>Total Amount: RM {totalIncome.toFixed(2)}</Text>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => handleMonthChange(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    {monthsWithIncome.map((month) => (
                        <Picker.Item
                            key={month}
                            label={formatMonth(month)}
                            value={month}
                            color="#4e342e" 
                        />
                    ))}
                </Picker>
                <CustomPieChart
                    data={monthlyIncome[selectedMonth]}
                    selectedMonth={selectedMonth}
                />
            </ScrollView>
        );
    };

    return (
        <PagerView style={styles.container} initialPage={0}>
            <View key="1" style={styles.page}>
                <ExpenditureScreen />
            </View>
            <View key="2" style={styles.page}>
                <IncomeScreen />
            </View>
        </PagerView>
    );
};

export default ReportScreen;
