import React, { useEffect } from 'react'
import { createTable } from './src/services/DatabaseService'
import { RootRoutes } from './src/routes/route'
import {
    notificationRegister,
    notificationUnregister,
} from './src/utils/notification'
import { useNotificationTimeStore } from './state/notificationTimeState'
import { useNoticeStateStore } from './state/noticeState'
import { AppState, NativeEventSubscription } from 'react-native'

const App: React.FC = () => {
    const { noticeState, setNoticeState } = useNoticeStateStore()
    const { notificationTime, setNotificationTime } = useNotificationTimeStore()
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
