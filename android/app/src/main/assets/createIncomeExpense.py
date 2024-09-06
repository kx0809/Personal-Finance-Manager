import sqlite3

# Connect to the database
db = sqlite3.connect('myincomeexpense.sqlite')

# Drop the table if it exists
db.execute('DROP TABLE IF EXISTS IncomeExpense')

# Create the table
db.execute('''
    CREATE TABLE IncomeExpense(
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        amount TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date integer NOT NULL
    )
''')

# Commit changes and close the connection
db.commit()
db.close()
