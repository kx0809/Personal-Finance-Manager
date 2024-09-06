import sqlite3

# Connect to the database
db = sqlite3.connect('myexpenseincome.sqlite')

# Drop the table if it exists
db.execute('DROP TABLE IF EXISTS ExpenseIncome')

# Create the table
db.execute('''
    CREATE TABLE ExpenseIncome(
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        amount TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL
    )
''')

# Commit changes and close the connection
db.commit()
db.close()
