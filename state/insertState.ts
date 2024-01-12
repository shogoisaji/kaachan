import { create } from 'zustand'

interface InsertState {
    insertTrigger: boolean
    setInsertTrigger: (setBoolean: boolean) => void // setBooleanというbooleanを受け取りvoidを返す
}

export const useInsertStore = create<InsertState>((set) => ({
    insertTrigger: false,
    setInsertTrigger: (setBoolean) =>
        set((state) => ({ insertTrigger: setBoolean })),
}))
