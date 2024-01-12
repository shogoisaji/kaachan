// import PushNotificationIOS from '@react-native-community/push-notification-ios'
// import { Platform } from 'react-native'
// import PushNotification from 'react-native-push-notification'

// // 通知の設定
// // PushNotificationIOS.configure({
// //     // (必要に応じてその他の設定)
// //     onNotification: function (notification) {
// //         console.log('LOCAL NOTIFICATION ==>', notification)
// //     },
// //     requestPermissions: Platform.OS === 'ios',
// // })

// // 毎日特定の時間に通知をスケジュールする関数
// const getCorrectDate = (hour: number, minute: number) => {
//     const date = new Date()
//     // date.setDate(date.getDate() + 1)
//     date.setHours(hour)
//     date.setMinutes(minute)
//     return date
// }

// export const scheduleDailyNotification = () => {
//     PushNotificationIOS.addNotificationRequest({
//         id: 'daily-notification', // 通知のID
//         title: 'あなたのメッセージ', // 通知の本文
//         fireDate: getCorrectDate(20, 0), // 1分後に最初の通知を設定
//         repeats: true, // 毎日繰り返す
//         repeatsComponent: { hour: true, minute: true }, // 毎日繰り返す
//     })
// }
