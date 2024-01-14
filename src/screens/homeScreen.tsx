import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { InputDialog } from '../components/inputDialog'
import { Mom } from '../components/mom'
import { VerticalChart } from '../components/verticalChart'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchTotalsData } from '../services/DatabaseService'
import { updateDbTotalsStore, useDbTotalsStore } from '../../state/dbStore'
import { currentDate } from '../utils/utils'
import { useSelectedDateStore } from '../../state/appState'

export const HomeScreen: React.FC = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const { dbTotals, setDbTotals } = useDbTotalsStore((state) => ({
        dbTotals: state.dbTotals,
        setDbTotals: state.setDbTotals,
    }))
    const animationState: string = 'happy1'

    useEffect(() => {
        updateDbTotalsStore()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue px-4">
            <View className="flex-row mb-2 justify-between items-end">
                <Mom animationState={animationState} />
                <TouchableOpacity
                    onPress={() => {
                        setSelectedDate(currentDate())
                    }}
                    activeOpacity={0.5}
                >
                    <View className="flex-col items-start">
                        <Text className="text-lg text-custom-darkblue -mb-1 ">
                            Today
                        </Text>
                        <Text className="mb-2 text-4xl font-bold text-custom-darkblue items-end">
                            {new Date().getMonth() + 1} / {new Date().getDate()}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row mb-4 justify-center">
                <VerticalChart />
            </View>
            <View className="flex flex-row justify-center">
                <View className="flex-1 flex-row justify-between items-center bg-custom-blue rounded-xl h-20 mt-4 p-4">
                    <Text className="text-2xl font-bold text-white">Today</Text>
                    <Text className="text-4xl font-bold text-white pr-6">
                        {dbTotals.day} h
                    </Text>
                </View>
                <View className="w-4" />

                <InputDialog />
            </View>
            <View className="flex flex-row justify-between">
                <View className="flex-1 flex-row justify-between items-center bg-custom-blue rounded-xl mt-4 p-4">
                    <Text className="text-lg font-bold text-white">Week</Text>
                    <Text className="text-2xl font-bold text-white">
                        {dbTotals.week} h
                    </Text>
                </View>
                <View className="w-4" />
                <View className="flex-1 flex-row justify-between items-center bg-custom-blue rounded-xl mt-4 p-4">
                    <Text className="text-lg font-bold text-white">Month</Text>
                    <Text className="text-2xl font-bold text-white">
                        {dbTotals.month} h
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
