import React, { useEffect } from 'react'
import { createTable, fetchSevenDaysData } from './src/services/DatabaseService'
import { RootRoutes } from './src/routes/route'
import {
    notificationRegister,
    notificationUnregister,
} from './src/utils/notification'
import { useNotificationTimeStore } from './state/notificationTimeState'
import { useNoticeStateStore } from './state/noticeState'
import { AppState, NativeEventSubscription } from 'react-native'
import { useMomStateStore } from './state/momStateStore'
import { checkMomState, getMomState } from './src/utils/momState'

const App: React.FC = () => {
    const { noticeState, setNoticeState } = useNoticeStateStore()
    const { notificationTime, setNotificationTime } = useNotificationTimeStore()
    const { momState, setMomState } = useMomStateStore()

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'active') {
                    if (noticeState) {
                        notificationRegister(notificationTime)
                    }
                }
            }
        )
        createTable()
        getMomState(setMomState)
        return () => {
            if (subscription) {
                subscription.remove()
            }
        }
    }, [])

    return (
        <>
            <RootRoutes />
        </>
    )
}

export default App
