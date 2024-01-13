import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type State = {
    noticeState: boolean
    setNoticeState: (noticeState: boolean) => void
}

export const useNoticeStateStore = create<State, [['zustand/persist', State]]>(
    persist(
        (set) => ({
            noticeState: false,
            setNoticeState: (noticeState: boolean) =>
                set(() => ({ noticeState: noticeState })),
        }),
        {
            name: 'noticeState',
            storage: createJSONStorage(() => AsyncStorage), //シリアライズ、デシリアライズは自動
        }
    )
)
