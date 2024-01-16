import { create } from 'zustand'
import { fetchTotalsData, fetchWeekData } from '../src/services/DatabaseService'

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

interface UpdateTriggerType {
    update: boolean
    setUpdate: (data: boolean) => void
}

export const updateTriggerStore = create<UpdateTriggerType>((set) => ({
    update: false,
    setUpdate: (boolean: boolean) => set({ update: boolean }),
}))

interface CreateTableType {
    isCreate: boolean
    setIsCreate: (boolean: boolean) => void
}

export const createTableStore = create<CreateTableType>((set) => ({
    isCreate: false,
    setIsCreate: (boolean: boolean) => {
        return set({ isCreate: boolean })
    },
}))
