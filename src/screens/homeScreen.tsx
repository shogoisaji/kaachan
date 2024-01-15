import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { InputDialog } from '../components/inputDialog'
import { Mom } from '../components/mom'
import { VerticalChart } from '../components/verticalChart'
import { SafeAreaView } from 'react-native-safe-area-context'
import { updateDbTotalsStore, useDbTotalsStore } from '../../state/dbStore'
import { currentDateString, getMonday } from '../utils/utils'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import { DateController } from '../components/dateController'
import dayjs from 'dayjs'
import { months } from '../config/config'
import { useMomStateStore } from '../../state/momStateStore'
import { ImageBackground } from 'react-native'

export const HomeScreen: React.FC = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const { momState, setMomState } = useMomStateStore()
    const { dbTotals, setDbTotals } = useDbTotalsStore((state) => ({
        dbTotals: state.dbTotals,
        setDbTotals: state.setDbTotals,
    }))

    const weekStartDateString = dayjs(getMonday(selectedDate)).format('M/D')

    const currentMonth = months[dayjs(getMonday(selectedDate)).month()]

    useEffect(() => {
        updateDbTotalsStore(selectedDate)
    }, [selectedDate])

    return (
        <View className="flex-1 bg-custom-lightblue">
            <ImageBackground
                source={require('../../assets/bg.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <SafeAreaView edges={['top']} className="flex-1">
                    <ScrollView>
                        <View className="flex-row mb-3 justify-between items-end px-4">
                            <View className="bg-custom-lightblue justify-center items-center shadow-sm shadow-gray-700 pb-1 pl-1 w-32 h-32 rounded-full">
                                <Mom animationState={momState} />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedDate(currentDateString())
                                }}
                                activeOpacity={0.5}
                            >
                                <View className="flex-col items-start">
                                    <Text className="text-lg text-custom-darkblue -mb-1 ">
                                        Today
                                    </Text>
                                    <Text className="mb-2 text-4xl font-bold text-custom-darkblue items-end">
                                        {dayjs().format('M / D')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-col mb-3 mx-4 px-4 pb-4 pt-2 justify-center shadow shadow-blue-800 bg-custom-blue rounded-2xl">
                            <DateController />
                            <VerticalChart />
                        </View>
                        <View className="flex-row justify-center mx-4">
                            <View className="flex-1 flex-row justify-between items-center shadow shadow-blue-800 bg-custom-blue rounded-xl h-20 mt-4 p-4">
                                <Text className="text-3xl font-bold text-custom-darkblue">
                                    Today
                                </Text>
                                <Text className="text-4xl font-bold text-white pr-6">
                                    {dbTotals.day} h
                                </Text>
                            </View>
                            <View className="w-4" />
                            <InputDialog />
                        </View>
                        <View className="flex flex-row justify-between mx-4">
                            <View className="flex-1 flex-row justify-between items-center shadow shadow-blue-800 bg-custom-blue rounded-xl mt-5 px-4 py-2">
                                <View className="flex-col">
                                    <Text className="text-lg font-bold text-custom-darkblue">
                                        Week
                                    </Text>
                                    <Text className="text-lg font-bold text-custom-darkblue">
                                        {weekStartDateString} ~
                                    </Text>
                                </View>
                                <Text className="text-2xl font-bold text-white">
                                    {dbTotals.week} h
                                </Text>
                            </View>
                            <View className="w-4" />
                            <View className="flex-1 flex-row justify-between items-center shadow shadow-blue-800 bg-custom-blue rounded-xl mt-5 px-4 py-2">
                                <View className="flex-col">
                                    <Text className="text-lg font-bold text-custom-darkblue">
                                        Month
                                    </Text>
                                    <Text className="text-lg font-bold text-custom-darkblue">
                                        {currentMonth}
                                    </Text>
                                </View>
                                <Text className="text-2xl font-bold text-white">
                                    {dbTotals.month} h
                                </Text>
                            </View>
                        </View>
                        <View className="h-8" />
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}
