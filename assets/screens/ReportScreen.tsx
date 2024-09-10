import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDBConnection, getMonthlyExpenditures } from './HomeScreen/db-service'; 
import CustomPieChart from '../components/CustomPieChart'; 

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
    const [months, setMonths] = useState<string[]>([]);
    const [monthlyExpenditures, setMonthlyExpenditures] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = await getDBConnection();
                const data = await getMonthlyExpenditures(db);

                const availableMonths = Object.keys(data);
                if (availableMonths.length > 0) {
                    setMonths(availableMonths);
                    setMonthlyExpenditures(data);
                    const currentMonth = getCurrentMonth();

                    if (availableMonths.includes(currentMonth)) {
                        setSelectedMonth(currentMonth);
                    } else {
                        setSelectedMonth(availableMonths[0]);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#ffb300" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Monthly Expenditures</Text>
            {months.length > 0 ? (
                <>
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue) => handleMonthChange(itemValue)}
                        style={styles.picker}
                        mode="dropdown"
                    >
                        {months.map((month) => (
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
                </>
            ) : (
                <Text style={styles.noData}>No data available for any month</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fefbe9', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4e342e', 
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#d7ccc8', 
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noData: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#4e342e', 
    },
});

export default ReportScreen;
