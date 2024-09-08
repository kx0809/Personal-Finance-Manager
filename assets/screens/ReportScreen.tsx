import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { getDBConnection, getMonthlyExpenditures } from './HomeScreen/db-service'; // Adjust the import path accordingly

const { width: screenWidth } = Dimensions.get('window');

const ReportScreen = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [months, setMonths] = useState<string[]>([]);
    const [monthlyExpenditures, setMonthlyExpenditures] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = await getDBConnection();
                const data = await getMonthlyExpenditures(db);

                // Extract months from data
                const availableMonths = Object.keys(data);

                if (availableMonths.length > 0) {
                    setMonths(availableMonths);
                    setMonthlyExpenditures(data);
                    const firstMonth = availableMonths[0];
                    setSelectedMonth(firstMonth);
                    updateChartData(firstMonth, data);
                } else {
                    setMonths([]);
                    setMonthlyExpenditures({});
                    setSelectedMonth('');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateChartData = (month: string, data: any) => {
        const monthData = data[month] || {};
        const chartData = {
            labels: Object.keys(monthData),
            datasets: [
                {
                    data: Object.values(monthData)
                }
            ]
        };
        setChartData(chartData);
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
        updateChartData(month, monthlyExpenditures);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
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
                    >
                        {months.map((month) => (
                            <Picker.Item key={month} label={month} value={month} />
                        ))}
                    </Picker>
                    {chartData && chartData.labels.length > 0 ? (
                        <BarChart
                            data={chartData}
                            width={screenWidth * 0.95} // Adjust chart width
                            height={220}
                            yAxisLabel="$"
                            chartConfig={{
                                backgroundGradientFrom: "#f0f0f0",
                                backgroundGradientTo: "#ffffff",
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: '#ffa726',
                                },
                            }}
                            verticalLabelRotation={30}
                            style={styles.chart}
                        />
                    ) : (
                        <Text style={styles.noData}>No data available for the selected month</Text>
                    )}
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
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16
    },
    noData: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888'
    }
});

export default ReportScreen;
