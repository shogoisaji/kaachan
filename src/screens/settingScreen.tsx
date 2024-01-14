import React, { useEffect, useState } from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import { Button } from '@rneui/base'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    NotificationTimeTypes,
    cancelAllLocalNotifications,
    notificationRegister,
} from '../utils/notification'
import DatePicker from 'react-native-date-picker'
import { useNotificationTimeStore } from '../../state/notificationTimeState'
import { useNoticeStateStore } from '../../state/noticeState'

export const SettingScreen: React.FC = () => {
    // const [notice, setNotice] = useState<boolean>(false)
    const { noticeState, setNoticeState } = useNoticeStateStore()
    const { notificationTime, setNotificationTime } = useNotificationTimeStore()
    const [selectedTime, setSelectedTime] = useState(new Date())
    const [pickerVisible, setPickerVisible] = useState<boolean>(false)

    const handleRegister = () => {
        notificationRegister(notificationTime)
    }
    const handlePicConfirm = (date: Date) => {
        const notificationTime: NotificationTimeTypes = {
            hour: date.getHours(),
            minuit: date.getMinutes(),
        }
        setNotificationTime(notificationTime)
    }
    const toggleSwitch = () => {
        setNoticeState(!noticeState)
    }

    useEffect(() => {
        if (noticeState) {
            handleRegister()
        } else {
            cancelAllLocalNotifications()
        }
    }, [notificationTime, noticeState])

    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue">
            <View className="flex flex-row justify-between items-center mt-2">
                <View className="h-1 w-32 bg-custom-darkblue" />
                <Text className="text-2xl font-bold text-custom-darkblue">
                    Settings
                </Text>
                <View className="h-1 w-32 bg-custom-darkblue" />
            </View>
            <View className="m-8">
                <View className="flex-row justify-between items-center py-4 pl-6 pr-4 mb-4 bg-custom-blue rounded-xl">
                    <Text className="text-3xl text-white font-bold">通知</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#FF6A8C' }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={noticeState}
                    />
                </View>
                <View className="flex-row h-auto items-center justify-between py-4 pl-6 pr-4 bg-custom-blue rounded-xl">
                    <Text className="text-3xl text-white font-bold">
                        通知時間
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (!noticeState) return
                            setPickerVisible(true)
                        }}
                    >
                        <View className="bg-white py-2 px-4 rounded-lg justify-center items-center">
                            <Text
                                className={`${
                                    noticeState ? 'text-black' : 'text-gray-300'
                                } text-4xl font-bold`}
                            >
                                {notificationTime.hour
                                    .toString()
                                    .padStart(2, '0')}
                                :
                                {notificationTime.minuit
                                    .toString()
                                    .padStart(2, '0')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
