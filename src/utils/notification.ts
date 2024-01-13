import { AppState, NativeEventSubscription } from 'react-native'
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

export type NotificationTimeTypes = {
    hour: number
    minuit: number
}

const _handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
        PushNotification.setApplicationIconBadgeNumber(0)
    }
}

const _registerLocalNotification = (registerDate: NotificationTimeTypes) => {
    const messages = [
        '今日は勉強したんか〜?',
        '今日はたくさん勉強したのかな？',
        '今日の勉強の記録をしましょう',
    ]
    const message = messages[Math.floor(Math.random() * messages.length)]

    let nextNotificationTime = new Date()
    nextNotificationTime.setHours(registerDate.hour)
    nextNotificationTime.setMinutes(registerDate.minuit)
    nextNotificationTime.setSeconds(0)

    PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        vibrate: true,
        vibration: 300,
        priority: 'high',
        visibility: 'public',
        importance: 'high',

        /* iOS and Android properties */
        message, // (required)
        playSound: false,
        number: 1,
        actions: ['OK'],

        // for production
        repeatType: 'day',
        date: nextNotificationTime,
    })
}
let appStateSubscription: NativeEventSubscription

export const cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications()
}

export const notificationRegister = async (
    notificationTime: NotificationTimeTypes
) => {
    PushNotification.configure({
        onNotification: (notification) => {
            notification.finish(PushNotificationIOS.FetchResult.NoData)
        },
        popInitialNotification: true,
    })
    _registerLocalNotification(notificationTime)
    console.log(
        'notification set time',
        notificationTime.hour,
        ':',
        notificationTime.minuit
    )

    // AppState.addEventListener から返されるサブスクリプションを保持
    appStateSubscription = AppState.addEventListener(
        'change',
        _handleAppStateChange
    )
}

export const notificationUnregister = () => {
    // サブスクリプションを解除
    if (appStateSubscription) {
        appStateSubscription.remove()
    }
}

// export default {
//     register: async () => {
//         PushNotification.configure({
//             onNotification: (notification) => {
//                 notification.finish(PushNotificationIOS.FetchResult.NoData)
//             },
//             // popInitialNotification: true,
//         })

//         _registerLocalNotification()

//         // AppState.addEventListener から返されるサブスクリプションを保持
//         appStateSubscription = AppState.addEventListener(
//             'change',
//             _handleAppStateChange
//         )
//     },
//     unregister: () => {
//         // サブスクリプションを解除
//         if (appStateSubscription) {
//             appStateSubscription.remove()
//         }
//     },
// }
