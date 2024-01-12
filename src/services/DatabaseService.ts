import * as SQLite from 'expo-sqlite'
import { currentDate, currentDateString, getMonday } from '../utils/utils'

let db = SQLite.openDatabase('MyDB')

export const createTable = (): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT name FROM sqlite_master WHERE type="table" AND name="MyTable";',
            [],
            (tx, results) => {
                if (results.rows.length === 0) {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY, title TEXT, time REAL, tag TEXT, createdAt TEXT);',
                        [],
                        () => {
                            console.log('Table created successfully')
                        },
                        (error) => {
                            console.error(
                                'Error occurred while creating the table.',
                                error
                            )
                            return false
                        }
                    )
                } else {
                    console.log('Table already exists')
                }
            },
            (error) => {
                console.error(
                    'Error occurred while checking if the table exists.',
                    error
                )
                return false
            }
        )
    })
}

export const insertData = (
    title: string,
    time: number,
    tag: string
): Promise<string> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            const createdAt = currentDateString() //2024-01-10T16:08:15+09:00
            console.log('createdAt', createdAt)
            tx.executeSql(
                'INSERT INTO MyTable (title, time, tag, createdAt) VALUES (?, ?, ?, ?);',
                [title, time, tag, createdAt],
                (tx, results) => {
                    resolve(title)
                    console.log('Data inserted successfully:', title, createdAt)
                },
                (error) => {
                    console.error(
                        'データの挿入中にエラーが発生しました。',
                        error
                    )
                    reject(error)
                    return false
                }
            )
        })
    })
}

export const fetchAllData = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM MyTable ORDER BY createdAt DESC;',
                [],
                (tx, results) => {
                    let rows = results.rows._array
                    resolve(rows)
                },
                (error) => {
                    console.error('Error occurred while fetching data.', error)
                    reject(error)
                    return false
                }
            )
        })
    })
}

export const fetchDateData = (date: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM MyTable WHERE DATE(createdAt) = ?;',
                [date],
                (tx, results) => {
                    let rows = results.rows._array
                    let sum = 0
                    rows.forEach((row) => {
                        sum += row.time
                    })
                    resolve(sum)
                },
                (error) => {
                    console.error('Error occurred while fetching data.', error)
                    reject(error)
                    return false
                }
            )
        })
    })
}

export const fetchWeekData = (date: Date): Promise<number[]> => {
    return new Promise(async (resolve, reject) => {
        const monday = getMonday(date)
        let promises: Promise<number>[] = []

        for (let i = 0; i < 7; i++) {
            // i日を加算した日付を取得
            const targetDate = new Date(
                monday.getTime() + i * 24 * 60 * 60 * 1000
            )
            const targetDateString = targetDate.toISOString().slice(0, 10)
            promises.push(fetchDateData(targetDateString))
        }

        // すべてのプロミスが解決された後にweekDataを解決
        Promise.all(promises)
            .then((weekData) => {
                resolve(weekData)
            })
            .catch((error) => {
                console.error('Error occurred while fetching week data.', error)
                reject(error)
            })
    })
}

type Totals = { day: number; week: number; month: number }

export const fetchTotalsData = (): Promise<Totals> => {
    // const currentDateString: string = currentDateString()//2024-01-10T16:08:15+09:00
    return new Promise((resolve, reject) => {
        let totals: Totals = {
            day: 0,
            week: 0,
            month: 0,
        }
        let promises: Promise<void>[] = []
        promises.push(
            new Promise<void>((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'SELECT * FROM MyTable WHERE DATE(createdAt) = DATE(?);',
                        [currentDateString()],
                        (tx, results) => {
                            let rows = results.rows._array
                            let sum = 0
                            rows.forEach((row) => {
                                sum += row.time
                            })
                            totals.day = sum
                            resolve()
                        }
                    )
                })
            })
        )
        promises.push(
            new Promise<void>((resolve, reject) => {
                db.transaction((tx) => {
                    const monday = getMonday(currentDate())
                    for (let i = 0; i < 7; i++) {
                        const targetDate = new Date(
                            monday.getTime() + i * 24 * 60 * 60 * 1000
                        )
                        const targetDateString = targetDate
                            .toISOString()
                            .slice(0, 10)
                        tx.executeSql(
                            'SELECT * FROM MyTable WHERE DATE(createdAt) = DATE(?);',
                            [targetDateString],
                            (tx, results) => {
                                let rows = results.rows._array
                                let sum = 0
                                rows.forEach((row) => {
                                    sum += row.time
                                })
                                totals.week += sum
                                resolve()
                            }
                        )
                    }
                })
            })
        )
        promises.push(
            new Promise<void>((resolve, reject) => {
                db.transaction((tx) => {
                    const firstDayOfMonth = new Date(
                        currentDate().getFullYear(),
                        currentDate().getMonth(),
                        1
                    )
                    const lastDayOfMonth = new Date(
                        currentDate().getFullYear(),
                        currentDate().getMonth() + 1,
                        0
                    )
                    const firstDayString = firstDayOfMonth
                        .toISOString()
                        .slice(0, 10)
                    const lastDayString = lastDayOfMonth
                        .toISOString()
                        .slice(0, 10)
                    tx.executeSql(
                        'SELECT * FROM MyTable where createdAt BETWEEN ? AND ?;',
                        [firstDayString, lastDayString],
                        (tx, results) => {
                            let rows = results.rows._array
                            let sum = 0
                            rows.forEach((row) => {
                                sum += row.time
                            })
                            totals.month += sum
                            resolve()
                        }
                    )
                })
            })
        )
        Promise.all(promises)
            .then(() => {
                resolve(totals)
            })
            .catch((error) => {
                console.error(
                    'Error occurred while fetching totals data.',
                    error
                )
                reject(error)
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
                return false
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
                return false
            }
        )
    })
}
