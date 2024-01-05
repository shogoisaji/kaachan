import SQLite from 'react-native-sqlite-storage'

let db = SQLite.openDatabase(
    {
        name: 'TestDB',
        location: 'default',
    },
    () => {
        console.log('Database is opened')
    },
    (error) => {
        console.error(error)
    }
)

export const createTable = (): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS TestTable (id INTEGER PRIMARY KEY, title TEXT, time REAL, tag TEXT, createdAt TEXT);',
            [],
            (tx, results) => {
                console.log('Table created successfully')
            },
            (error) => {
                console.error('Error occurred while creating the table.', error)
            }
        )
    })
}

export const insertData = (
    title: string,
    time: number,
    tag: string,
    createdAt: string
): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO TestTable (title, time, tag, createdAt) VALUES (?, ?, ?, ?);',
            [title, time, tag, createdAt],
            (tx, results) => {
                console.log('Data inserted successfully')
            },
            (error) => {
                console.error('Error occurred while inserting data.', error)
            }
        )
    })
}

export const fetchData = (): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM TestTable;',
            [],
            (tx, results) => {
                let rows = results.rows.raw()
                console.log('Data fetched:', rows)
            },
            (error) => {
                console.error('Error occurred while fetching data.', error)
            }
        )
    })
}

export const updateData = (
    id: number,
    title: string,
    time: number,
    tag: string,
    createdAt: string
): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE TestTable SET title = ?, time = ?, tag = ?, createdAt = ? WHERE id = ?;',
            [title, time, tag, createdAt, id],
            (tx, results) => {
                console.log('Data updated successfully')
            },
            (error) => {
                console.error('Error occurred while updating data.', error)
            }
        )
    })
}

export const deleteData = (id: number): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM TestTable WHERE id = ?;',
            [id],
            (tx, results) => {
                console.log('Data deleted successfully')
            },
            (error) => {
                console.error('Error occurred while deleting data.', error)
            }
        )
    })
}
