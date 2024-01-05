import SQLite from 'react-native-sqlite-storage'

let db = SQLite.openDatabase(
    {
        name: 'MyDB',
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
            'CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY, title TEXT, time REAL, tag TEXT, createdAt TEXT);',
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
            'INSERT INTO MyTable (title, time, tag, createdAt) VALUES (?, ?, ?, ?);',
            [title, time, tag, createdAt],
            (tx, results) => {
                console.log('データが正常に挿入されました', title)
            },
            (error) => {
                console.error('データの挿入中にエラーが発生しました。', error)
            }
        )
    })
}

export const fetchData = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM MyTable ORDER BY createdAt DESC;',
                [],
                (tx, results) => {
                    let rows = results.rows.raw()
                    // console.log('Data fetched:', rows)
                    resolve(rows)
                },
                (error) => {
                    console.error('Error occurred while fetching data.', error)
                    reject(error)
                }
            )
        })
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
            'UPDATE MyTable SET title = ?, time = ?, tag = ?, createdAt = ? WHERE id = ?;',
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
            'DELETE FROM MyTable WHERE id = ?;',
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
