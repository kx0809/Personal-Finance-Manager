import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
            color: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#ff5722', '#8e44ad', '#00bcd4', '#c2185b', '#3f51b5'][index % 9],
        };
    });

    return (
        <View style={styles.chartContainer}>
            <View style={styles.pieChartContainer}>
                <PieChart
                    data={pieData}
                    width={570}
                    height={300}
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
                <View style={styles.centerCircle}>
                    <Text style={styles.circleText}>Total:</Text>
                    <Text style={styles.circleText}>RM {totalExpenditure.toFixed(2)}</Text>
                </View>
                <ScrollView style={styles.legendContainer}>
                    {pieData.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>
                                {item.name}: RM {item.amount.toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
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
        marginLeft: 8,
    },
    pieChartContainer: {
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
        minHeight: 150
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 6,
        marginLeft: 60,
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
        flexShrink: 1,
    },
    centerCircle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 150, 
        height: 150, 
        borderRadius: 75, 
        backgroundColor: 'white', 
        transform: [{ translateX: -73 }, { translateY: -140 }], 
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

export default CustomPieChart;
