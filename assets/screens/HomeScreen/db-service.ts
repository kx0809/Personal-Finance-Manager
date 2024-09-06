import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const databaseName = 'myexpenseincome.sqlite';

// Enable promise for SQLite
enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase(
        { name: `${databaseName}`, createFromLocation: `~${databaseName}` },
        openCallback,
        errorCallback,
    );
}

export const getExpenditures = async (db: SQLiteDatabase): Promise<any> => {
    try {
        const expenditureData: any = [];
        const query = `SELECT * FROM ExpenseIncome ORDER BY type`;
        const results = await db.executeSql(query);
        results.forEach(result => {
            (result.rows.raw()).forEach((item: any) => {
              expenditureData.push(item);
            })
        });
        return expenditureData;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get Expense and Income !!!');
    }
}

export const getExpenditureById = async (db: SQLiteDatabase, expenditureId: string): Promise<any> => {
    try {
        const query = `SELECT * FROM ExpenseIncome WHERE id=?`;
        const results = await db.executeSql(query, [expenditureId]);
        return results[0].rows.item(0)
    } catch (error) {
        console.error(error);
        throw Error('Failed to get Expense and Income !!!');
    }
}

export const createExpenditure = async (
    db: SQLiteDatabase,
    type: string,
    amount: string,
    description: string,
    category: string // Add this parameter
) => {
    try {
        const query = 'INSERT INTO ExpenseIncome(type, amount, description, category) VALUES(?, ?, ?, ?)';
        const parameters = [type, amount, description, category];
        await db.executeSql(query, parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to create Expense and Income !!!');
    }
}

export const updateExpenditure = async (
    db: SQLiteDatabase,
    type: string,
    amount: string,
    description: string,
    category: string, // Add this parameter
    expenditureId: string
) => {
    try {
        const query = 'UPDATE ExpenseIncome SET type=?, amount=?, description=?, category=? WHERE id=?';
        const parameters = [type, amount, description, category, expenditureId];
        await db.executeSql(query, parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to update Expense and Income !!!');
    }
}

export const deleteExpenditure = async (
    db: SQLiteDatabase,
    expenditureId: string
) => {
    try {
        const query = 'DELETE FROM ExpenseIncome WHERE id = ?';
        await db.executeSql(query, [expenditureId]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete Expense and Income !!!');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}
