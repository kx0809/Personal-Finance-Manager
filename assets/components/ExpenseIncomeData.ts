import RNFS from 'react-native-fs';

const dataFilePath = RNFS.DocumentDirectoryPath + '/ExpenseIncomeData.json';

const defaultIncomeData = [
  { id: '1', name: 'Salary', icon: 'money' },
  { id: '2', name: 'Bonus', icon: 'gift' },
  { id: '3', name: 'Rebate', icon: 'percent' },
  { id: '4', name: 'Trade', icon: 'exchange' },
  { id: '5', name: 'Dividend', icon: 'line-chart' },
  { id: '6', name: 'IncomeRent', icon: 'home' },
  { id: '7', name: 'Investment', icon: 'stack-overflow' },
  { id: '8', name: 'Other', icon: 'ellipsis-h' },
  { id: '9', name: 'Income', icon: 'xing' },
];

const defaultExpensesData = [
  { id: '1', name: 'Food', icon: 'cutlery' },
  { id: '2', name: 'Transport', icon: 'bus' },
  { id: '3', name: 'Shopping', icon: 'shopping-cart' },
  { id: '4', name: 'Rent', icon: 'home' },
  { id: '5', name: 'Bills', icon: 'file-text' },
  { id: '6', name: 'Entertainment', icon: 'music' },
];

export const saveDefaultDataToFile = async () => {
  const data = {
    incomeData: defaultIncomeData,
    expensesData: defaultExpensesData,
  };

  try {
    await RNFS.writeFile(dataFilePath, JSON.stringify(data), 'utf8');
    console.log('Default data saved successfully');
  } catch (error) {
    console.error('Error saving default data:', error);
  }
};

export const readDataFromFile = async () => {
  try {
    const fileExists = await RNFS.exists(dataFilePath);
    if (!fileExists) {
      console.log('Data file does not exist, saving default data.');
      await saveDefaultDataToFile();
    }
    
    const fileContent = await RNFS.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return { incomeData: defaultIncomeData, expensesData: defaultExpensesData }; // Fallback to default data
  }
};
