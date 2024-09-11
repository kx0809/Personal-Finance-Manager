import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './CategoriesScreen'; 
import FoodScreen from './ExpenseScreens/FoodScreen';
import TransportScreen from './ExpenseScreens/TransportScreen';
import ShoppingScreen from './ExpenseScreens/ShoppingScreen';
import RentScreen from './ExpenseScreens/RentScreen';
import BillsScreen from './ExpenseScreens/BillsScreen';
import EntertainmentScreen from './ExpenseScreens/EntertainmentScreen';
import SalaryScreen from './IncomeScreens/SalaryScreen';
import BonusScreen from './IncomeScreens/BonusScreen';
import RebateScreen from './IncomeScreens/RebateScreen';
import TradeScreen from './IncomeScreens/TradeScreen';
import DividendScreen from './IncomeScreens/DividendScreen';
import IncomeRentScreen from './IncomeScreens/IncomeRentScreen';
import InvestmentScreen from './IncomeScreens/InvestmentScreen';
import OtherScreen from './IncomeScreens/OtherScreen';
import IncomeScreen from './IncomeScreens/IncomeScreen';

const Stack = createStackNavigator();

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ headerShown: false }} 
      />
      {/* Expenses screens */}
      <Stack.Screen
            name="Food"
            component={FoodScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Food',
          }}
          />

          <Stack.Screen
            name="Transport"
            component={TransportScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Transport',
          }}
          />

          <Stack.Screen
            name="Shopping"
            component={ShoppingScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Shopping',
          }}
          />

          <Stack.Screen
            name="Rent"
            component={RentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Rent',
          }}
          />


          <Stack.Screen
            name="Bills"
            component={BillsScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Bills',
          }}
          />

          <Stack.Screen
            name="Entertainment"
            component={EntertainmentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Entertainment',
          }}
          />

      {/* Income screens */}
      <Stack.Screen
            name="Salary"
            component={SalaryScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Salary',
          }}
          />

          <Stack.Screen
            name="Bonus"
            component={BonusScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Bonus',
          }}
          />

          <Stack.Screen
            name="Rebate"
            component={RebateScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Rebate',
          }}
          />

          <Stack.Screen
            name="Trade"
            component={TradeScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Trade',
          }}
          />

          <Stack.Screen
            name="Dividend"
            component={DividendScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Dividend',
          }}
          />

          <Stack.Screen
            name="IncomeRent"
            component={IncomeRentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income Rent',
          }}
          />

          <Stack.Screen
            name="Investment"
            component={InvestmentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Investment',
          }}
          />

          <Stack.Screen
            name="Other"
            component={OtherScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Other',
          }}
          />

          <Stack.Screen
            name="Income"
            component={IncomeScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffebcd',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income',
          }}
          />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
