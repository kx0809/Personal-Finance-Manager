import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const databaseName = 'myincomeexpense.sqlite';

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
        const query = `SELECT * FROM IncomeExpense ORDER BY type`;
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
        const query = `SELECT * FROM IncomeExpense WHERE id=?`;
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
    category: string, 
    date: number
) => {
    try {
        const query = 'INSERT INTO IncomeExpense(type, amount, description, category, date) VALUES(?, ?, ?, ?, ?)';
        const parameters = [type, amount, description, category, date];
        await db.executeSql(query, parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to create Expense and Income !!!');
    }
}

export const updateExpenditure = async (
db: SQLiteDatabase, type: string, amount: string, description: string, category: string, date: number, expenditureId: string) => {
    try {
        const query = 'UPDATE IncomeExpense SET type=?, amount=?, description=?, category=?, date=? WHERE id=?';
        const parameters = [type, amount, description, category, date, expenditureId, ];
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
        const query = 'DELETE FROM IncomeExpense WHERE id = ?';
        await db.executeSql(query, [expenditureId]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete Expense and Income !!!');
    }
}

export const getMonthlyExpenditures = async (db: SQLiteDatabase): Promise<any> => {
    try {
        const query = `SELECT type, strftime('%Y-%m', date / 1000, 'unixepoch') AS month, SUM(amount) AS total
                       FROM IncomeExpense
                       GROUP BY type, month
                       ORDER BY month, type`;
        const results = await db.executeSql(query);
        const expenditures: { [key: string]: { [type: string]: number } } = {};
        
        results.forEach(result => {
            result.rows.raw().forEach((row: any) => {
                const { month, type, total } = row;
                if (!expenditures[month]) {
                    expenditures[month] = {};
                }
                expenditures[month][type] = total;
            });
        });
        return expenditures;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get Monthly Expenditures!');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}
