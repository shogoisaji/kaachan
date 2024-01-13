import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NotificationTimeTypes } from '../src/utils/notification'

type State = {
    notificationTime: NotificationTimeTypes
    setNotificationTime: (timeObject: NotificationTimeTypes) => void
}

export const useNotificationTimeStore = create<
    State,
    [['zustand/persist', State]]
>(
    persist(
        (set) => ({
            notificationTime: { hour: 0, minuit: 0 },
            setNotificationTime: (timeObject: NotificationTimeTypes) =>
                set(() => ({ notificationTime: timeObject })),
        }),
        {
            name: 'notificationTime',
            storage: createJSONStorage(() => AsyncStorage), //シリアライズ、デシリアライズは自動
        }
    )
)
