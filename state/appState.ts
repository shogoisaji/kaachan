import { create } from 'zustand'
import { currentDate } from '../src/utils/utils'

interface selectDate {
    selectedDate: Date
    setSelectedDate: (date: Date) => void
}

export const useSelectedDateStore = create<selectDate>((set) => ({
    selectedDate: currentDate(),
    setSelectedDate: (date) => set((_) => ({ selectedDate: date })),
}))
