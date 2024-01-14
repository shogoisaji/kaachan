import { create } from 'zustand'
import { currentDateString } from '../src/utils/utils'

interface selectDate {
    selectedDate: string
    setSelectedDate: (date: string) => void
}

export const useSelectedDateStore = create<selectDate>((set) => ({
    selectedDate: currentDateString(),
    setSelectedDate: (date) => set((_) => ({ selectedDate: date })),
}))
