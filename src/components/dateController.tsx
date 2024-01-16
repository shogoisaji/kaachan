import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import dayjs from 'dayjs'

export const DateController: React.FC = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore()

    const nextWeek = () => {
        const newDate = dayjs(selectedDate).add(7, 'day')
        setSelectedDate(newDate.format().slice(0, 19))
    }

    const prevWeek = () => {
        const newDate = dayjs(selectedDate).add(-7, 'day')
        setSelectedDate(newDate.format().slice(0, 19))
    }
    const nextMonth = () => {
        const newDate = dayjs(selectedDate).add(1, 'month')
        setSelectedDate(newDate.format().slice(0, 19))
    }

    const prevMonth = () => {
        const newDate = dayjs(selectedDate).add(-1, 'month')
        setSelectedDate(newDate.format().slice(0, 19))
    }

    const setYear = dayjs(selectedDate).format('YYYY')
    const setMonth = dayjs(selectedDate).format('M')

    return (
        <View className="flex flex-row bg-custom-blue rounded-xl items-end justify-between mt-1 mb-3">
            <FontAwesome
                name="angle-double-left"
                size={36}
                color="white"
                onPress={() => prevMonth()}
            />
            <FontAwesome
                name="angle-left"
                size={36}
                color="white"
                onPress={() => prevWeek()}
            />
            <View className="flex-row items-end bg-white rounded-3xl pl-3 pr-4 py-1">
                <Text className="text-xl font-bold text-custom-darkblue mb-1">
                    {setYear} .{' '}
                </Text>
                <Text className="text-4xl font-black text-custom-pink">
                    {setMonth}
                </Text>
            </View>
            <FontAwesome
                name="angle-right"
                size={36}
                color="white"
                onPress={() => nextWeek()}
            />
            <FontAwesome
                name="angle-double-right"
                size={36}
                color="white"
                onPress={() => nextMonth()}
            />
        </View>
    )
}
