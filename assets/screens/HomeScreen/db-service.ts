import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const databaseName = 'myexpenditures.sqlite';

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
        const query = `SELECT * FROM expenditures ORDER BY type`;
        const results = await db.executeSql(query);
        results.forEach(result => {
            (result.rows.raw()).forEach((item: any) => {
              expenditureData.push(item);
            })
        });
        return expenditureData;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get expenditures !!!');
    }
}

export const getExpenditureById = async (db: SQLiteDatabase, expenditureId: string): Promise<any> => {
    try {
        const query = `SELECT * FROM expenditures WHERE id=?`;
        const results = await db.executeSql(query, [expenditureId]);
        return results[0].rows.item(0)
    } catch (error) {
        console.error(error);
        throw Error('Failed to get expenditures !!!');
    }
}

export const createExpenditure = async (
    db: SQLiteDatabase,
    type: string,
    amount: string,
    description: string,
) => {
    try {
        const query = 'INSERT INTO expenditures(type, amount, description) VALUES(?, ?, ?)';
        const parameters = [type, amount, description];
        await db.executeSql(query, parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to create expenditures !!!');
    }
}

export const updateExpenditure = async (
    db: SQLiteDatabase,
    type: string,
    amount: string,
    description: string,
    expenditureId: string
) => {
    try {
        const query = 'UPDATE expenditures SET type=?, amount=?, description=? WHERE id=?';
        const parameters = [type, amount, description, expenditureId];
        await db.executeSql(query, parameters);
    } catch (error) {
        console.error(error);
        throw Error('Failed to update expenditures !!!');
    }
}

export const deleteExpenditure = async (
    db: SQLiteDatabase,
    expenditureId: string
) => {
    try {
        const query = 'DELETE FROM expenditures WHERE id = ?';
        await db.executeSql(query, [expenditureId]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete expenditures !!!');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}
