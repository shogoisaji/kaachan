import * as SQLite from 'expo-sqlite'
import { currentDateString, getMonday } from '../utils/utils'
import dayjs from 'dayjs'

let db = SQLite.openDatabase('MyDB')

export const createTable = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY, title TEXT, time REAL, tag TEXT, createdAt TEXT);',
                [],
                () => {
                    console.log('Table created successfully')
                    resolve()
                },
                (error) => {
                    console.error(
                        'Error occurred while creating the table.',
                        error
                    )
                    reject(error)
                    return false
                }
            )
        })
    })
}

export const insertData = (
    title: string,
    time: number,
    tag: string
): Promise<string> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            const createdAt = currentDateString() //2024-01-10T16:08:15
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

export const fetchSevenDaysData = (): Promise<number[]> => {
    let promises: Promise<number>[] = []
    for (let i = 0; i < 7; i++) {
        const targetDate = dayjs().subtract(i, 'day')
        const targetDateString = targetDate.format('YYYY-MM-DD')
        promises.push(
            new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'SELECT * FROM MyTable WHERE DATE(createdAt) = DATE(?);',
                        [targetDateString],
                        (tx, results) => {
                            let rows = results.rows._array
                            let sum = 0
                            rows.forEach((row) => {
                                sum += row.time
                            })
                            resolve(sum)
                        },
                        (error) => {
                            console.error(
                                'データの取得中にエラーが発生しました。',
                                error
                            )
                            reject(error)
                            return false
                        }
                    )
                })
            })
        )
    }
    return Promise.all(promises)
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

export const fetchWeekData = (date: string): Promise<number[]> => {
    return new Promise(async (resolve, reject) => {
        const mondayString = getMonday(date)
        const monday = dayjs(mondayString)
        let promises: Promise<number>[] = []

        for (let i = 0; i < 7; i++) {
            // i日を加算した日付を取得
            const targetDate = monday.add(i, 'day')
            const targetDateString = targetDate.format('YYYY-MM-DD')
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

export const fetchTotalsData = (selectedDate: string): Promise<Totals> => {
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
                    const mondayString = getMonday(selectedDate)
                    const monday = dayjs(mondayString)
                    for (let i = 0; i < 7; i++) {
                        const targetDate = monday.add(i, 'day')
                        const targetDateString = targetDate.format('YYYY-MM-DD')
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
                const monday = getMonday(selectedDate)
                const convertedDate = dayjs(monday)
                db.transaction((tx) => {
                    const firstDayOfMonth = new Date(
                        convertedDate.year(),
                        convertedDate.month(),
                        1
                    )
                    const lastDayOfMonth = new Date(
                        convertedDate.year(),
                        convertedDate.month() + 1,
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

export const updateData = (updateData: {
    id: number
    title: string
    time: number
    tag: string
}): void => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE MyTable SET title = ?, time = ?, tag = ? WHERE id = ?;',
            [updateData.title, updateData.time, updateData.tag, updateData.id],
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
