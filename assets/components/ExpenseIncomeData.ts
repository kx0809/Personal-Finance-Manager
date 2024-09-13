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
  { id: '8', name: 'Income', icon: 'xing' },
  { id: '9', name: 'other', icon: 'ellipsis-h' },
];

const defaultExpensesData = [
  { id: '1', name: 'Food', icon: 'cutlery' },
  { id: '2', name: 'Transport', icon: 'bus' },
  { id: '3', name: 'Shopping', icon: 'shopping-cart' },
  { id: '4', name: 'Rent', icon: 'home' },
  { id: '5', name: 'Bills', icon: 'file-text' },
  { id: '6', name: 'Entertainment', icon: 'music' },
  { id: '7', name: 'Gift', icon: 'gift' },
  { id: '8', name: 'Insurance', icon: 'wpforms' },
  { id: '9', name: 'Other', icon: 'ellipsis-h' },
];

// Function to save the default data to the file
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

// Function to delete the existing file and save new default data
export const resetDataFile = async () => {
  try {
    const fileExists = await RNFS.exists(dataFilePath);
    if (fileExists) {
      // Delete the existing file if it exists
      await RNFS.unlink(dataFilePath);
      console.log('Old data file removed');
    }

    // Save the new default data
    await saveDefaultDataToFile();
    console.log('New default data saved');
  } catch (error) {
    console.error('Error resetting data file:', error);
  }
};

// Function to read data from the file or reset it if necessary
export const readDataFromFile = async () => {
  try {
    const fileExists = await RNFS.exists(dataFilePath);
    if (!fileExists) {
      console.log('Data file does not exist, resetting data.');
      await resetDataFile(); // Reset the data if the file doesn't exist
    } else {
      // If the file exists, delete it and save new data
      await resetDataFile();
    }

    // Read the content from the new file
    const fileContent = await RNFS.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return { incomeData: defaultIncomeData, expensesData: defaultExpensesData }; // Fallback to default data
  }
};
