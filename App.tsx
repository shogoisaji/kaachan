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
import { createTableStore } from './state/dbStore'

const App: React.FC = () => {
    const { noticeState, setNoticeState } = useNoticeStateStore()
    const { notificationTime, setNotificationTime } = useNotificationTimeStore()
    const { momState, setMomState } = useMomStateStore()
    const { isCreate, setIsCreate } = createTableStore()

    useEffect(() => {
        const initialize = async () => {
            await createTable()
            // テーブルが作成されたことを状態に保存
            setIsCreate(true)
            getMomState(setMomState)
        }

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

        initialize()

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
