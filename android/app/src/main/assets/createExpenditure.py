import sqlite3
db = sqlite3.connect('myexpenditures.sqlite')

db.execute('DROP TABLE IF EXISTS expenditures')

db.execute('''CREATE TABLE expenditures(
    id integer PRIMARY KEY,
    type text NOT NULL,
    amount text NOT NULL,
    description text NOT NULL
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO expenditures(type,amount,description)
    VALUES('Entertainment','18','Movie Ticket')
''')

cursor.execute('''
    INSERT INTO expenditures(type,amount,description)
    VALUES('Sport','20','Badminton court')
''')

cursor.execute('''
    INSERT INTO expenditures(type,amount,description)
    VALUES('Food','205','Omakase')
''')


db.commit()
db.close()