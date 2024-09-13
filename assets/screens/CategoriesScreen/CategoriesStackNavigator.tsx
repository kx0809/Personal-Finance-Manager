import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './CategoriesScreen'; 
import FoodScreen from './ExpenseScreens/FoodScreen';
import TransportScreen from './ExpenseScreens/TransportScreen';
import ShoppingScreen from './ExpenseScreens/ShoppingScreen';
import GiftScreen from './ExpenseScreens/GiftScreen';
import InsuranceScreen from './ExpenseScreens/InsuranceScreen';
import OtherExpensesScreen from './ExpenseScreens/OtherExpensesScreen';
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
import OtherIncomeScreen from './IncomeScreens/OtherIncomeScreen';
import IncomeScreen from './IncomeScreens/IncomeScreen';
import CustomCategoriesScreenHeader from '../../components/CustomCategoriesScreenHeader';

const Stack = createStackNavigator();

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomCategoriesScreenHeader onMenuPress={() => navigation.toggleDrawer()} />,
        })}
      />
      {/* Expenses screens */}
      <Stack.Screen
            name="Food"
            component={FoodScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Food',
          }}
          />

          <Stack.Screen
            name="Gift"
            component={GiftScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Gift',
          }}
          />

          <Stack.Screen
            name="Insurance"
            component={InsuranceScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Insurance',
          }}
          />

          <Stack.Screen
            name="Transport"
            component={TransportScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Transport',
          }}
          />

          <Stack.Screen
            name="Shopping"
            component={ShoppingScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Shopping',
          }}
          />

          <Stack.Screen
            name="Rent"
            component={RentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Rent',
          }}
          />


          <Stack.Screen
            name="Bills"
            component={BillsScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Bills',
          }}
          />

          <Stack.Screen
            name="Entertainment"
            component={EntertainmentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Entertainment',
          }}
          />

          <Stack.Screen
            name="Other"
            component={OtherExpensesScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Expense from Other',
          }}
          />

      {/* Income screens */}
      <Stack.Screen
            name="Salary"
            component={SalaryScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Salary',
          }}
          />

          <Stack.Screen
            name="Bonus"
            component={BonusScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Bonus',
          }}
          />

          <Stack.Screen
            name="Rebate"
            component={RebateScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Rebate',
          }}
          />

          <Stack.Screen
            name="Trade"
            component={TradeScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Trade',
          }}
          />

          <Stack.Screen
            name="Dividend"
            component={DividendScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Dividend',
          }}
          />

          <Stack.Screen
            name="IncomeRent"
            component={IncomeRentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Income Rent',
          }}
          />

          <Stack.Screen
            name="Investment"
            component={InvestmentScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Investment',
          }}
          />

          <Stack.Screen
            name="other"
            component={OtherIncomeScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from Other',
          }}
          />

          <Stack.Screen
            name="Income"
            component={IncomeScreen}
            options={{
            headerShown: true,
            headerStyle: {
            backgroundColor: '#ffb300',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Income from incomes',
          }}
          />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
