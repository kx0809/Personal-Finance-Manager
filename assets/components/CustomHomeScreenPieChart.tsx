import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type CustomHomeScreenPieChartProps = {
    data: { [key: string]: number };
    selectedMonth: string;
};

const CustomHomeScreenPieChart: React.FC<CustomHomeScreenPieChartProps> = ({ data, selectedMonth }) => {
    // Compute aggregated data
    const aggregatedData = {
        Expense: 0,
        Income: 0
    };

    Object.keys(data).forEach(label => {
        if (label === 'Expense' || label === 'Income') {
            aggregatedData[label] += data[label];
        }
    });

    // Calculate the balance
    const balance = aggregatedData.Income - aggregatedData.Expense;

    // Check if data is empty or if all values are zero
    const isDataEmpty = Object.keys(data).length === 0 || Object.values(data).every(value => value === 0);

    // Log for debugging
    useEffect(() => {
        console.log('Rendering with data:', data);
        console.log('Aggregated Data:', aggregatedData);
        console.log('Is Data Empty:', isDataEmpty);
    }, [data]);

    // Define pieData
    const pieData = isDataEmpty ? [
        {
            name: 'Expense',
            amount: 1, 
            color: '#cccccc',
        },
        {
            name: 'Income',
            amount: 1, 
            color: '#cccccc',
        }
    ] : [
        {
            name: 'Expense',
            amount: aggregatedData.Expense,
            color: '#fad4d4',
        },
        {
            name: 'Income',
            amount: aggregatedData.Income,
            color: '#d2ecfa',
        }
    ];

    return (
        <View style={styles.chartContainer}>
            <View style={styles.pieChartWrapper}>
                <PieChart
                    data={pieData}
                    width={570} 
                    height={300} 
                    chartConfig={{
                        backgroundColor: 'transparent',
                        color: (opacity = 1) => `rgba(78, 52, 46, ${opacity})`,
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
                <View style={styles.centerCircle}>
                    <Text style={styles.circleText}>Balance:</Text>
                    <Text style={styles.circleText}>RM{balance.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        paddingVertical: 10,
        marginBottom: 80,
        alignItems: 'center',
        flex: 1,
        marginTop: -30,
        marginRight: 10,
    },
    pieChartWrapper: {
        position: 'relative',
        width: 300,
        height: 200,
    },
    centerCircle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 150, 
        height: 150, 
        borderRadius: 75, 
        backgroundColor: 'white', 
        transform: [{ translateX: -67.5 }, { translateY: -25 }], 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    circleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4e342e',
    },
});

export default CustomHomeScreenPieChart;
