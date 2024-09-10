import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type CustomPieChartProps = {
    data: { [key: string]: number };
    selectedMonth: string;
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({ data, selectedMonth }) => {
    useEffect(() => {
        console.log('Rendering with data:', data);
    }, [data]);

    if (!data || Object.keys(data).length === 0) {
        return <Text style={styles.noData}>No data available for {selectedMonth}</Text>;
    }

    const totalExpenditure = Object.values(data).reduce((acc: number, value: number) => acc + value, 0);

    const pieData = Object.keys(data).map((label, index) => {
        const value = data[label];
        return {
            name: label,
            amount: value,
            color: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#ff5722', '#8e44ad'][index % 6],
        };
    });

    return (
        <View style={styles.chartContainer}>
            <View style={styles.pieChartContainer}>
                <PieChart
                    data={pieData}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#fefbe9', 
                        backgroundGradientFrom: '#fefbe9',
                        backgroundGradientTo: '#fefbe9',
                        color: (opacity = 1) => `rgba(78, 52, 46, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(78, 52, 46, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    center={[0, 0]}
                    absolute={false}
                />

                <View style={styles.legendContainer}>
                    {pieData.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>
                                {item.name}: RM {item.amount}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            <View>
                <Text style={styles.totalAmount}>Total Expenditure: RM {totalExpenditure}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        padding: 16,
        backgroundColor: '#fefbe9', 
        alignItems: 'center',
        flex: 1,
    },
    pieChartContainer: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    noData: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#4e342e', 
    },
    legendContainer: {
        marginTop: 16,
        width: '100%',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#d7ccc8',
        maxHeight: 150,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#d7ccc8',
    },
    legendColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#4e342e',
    },
    legendText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4e342e',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4e342e',
    },
});

export default CustomPieChart;
