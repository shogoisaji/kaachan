import { create } from 'zustand'
import {
    fetchAllData,
    fetchTotalsData,
    fetchWeekData,
} from '../src/services/DatabaseService'

interface DbTotals {
    dbTotals: { day: number; week: number; month: number }
    setDbTotals: (dbData: { day: number; week: number; month: number }) => void
}

const dbTotalsStore = create<DbTotals>((set) => ({
    dbTotals: { day: 0, week: 0, month: 0 },
    setDbTotals: (dbData) => set({ dbTotals: dbData }),
}))

export const useDbTotalsStore = dbTotalsStore

export const updateDbTotalsStore = async (selectedDate: string) => {
    try {
        const fetchData = (await fetchTotalsData(selectedDate)) as {
            day: number
            week: number
            month: number
        }
        dbTotalsStore.getState().setDbTotals(fetchData)
    } catch (error) {
        console.error('Error occurred while updating DbTotalsStore.', error)
    }
}

interface WeekData {
    weekData: number[]
    setWeekData: (data: number[]) => void
}

export const weekDataStore = create<WeekData>((set) => ({
    weekData: [],
    setWeekData: (data) => set((_) => ({ weekData: data })),
}))

export const useWeekDataStore = weekDataStore

export const updateWeekDataStore = async (date: string) => {
    try {
        const fetchData = (await fetchWeekData(date)) as number[]
        weekDataStore.getState().setWeekData(fetchData)
    } catch (error) {
        console.error('Error occurred while updating WeekDataStore.', error)
    }
}

interface AllRow {
    allRow: SaveDataTypes[]
    setAllRow: (allData: SaveDataTypes[]) => void
}

export const AllRowStore = create<AllRow>((set) => ({
    allRow: [],
    setAllRow: (allData) => set((_) => ({ allRow: allData })),
}))

export const useAllRowStore = AllRowStore

export const updateAllRowStore = async () => {
    try {
        const fetchData = (await fetchAllData()) as SaveDataTypes[]
        const sortedData = fetchData.sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        })
        AllRowStore.getState().setAllRow(sortedData)
    } catch (error) {
        console.error('Error occurred while updating AllRowStore.', error)
    }
}
