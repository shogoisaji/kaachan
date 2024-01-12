import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { InputDialog } from '../components/inputDialog'
import { Mom } from '../components/mom'
import { VerticalChart } from '../components/verticalChart'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchTotalsData } from '../services/DatabaseService'
import { updateDbTotalsStore, useDbTotalsStore } from '../../state/dbStore'

// interface Totals {
//     day: number
//     week: number
//     month: number
// }

export const HomeScreen: React.FC = () => {
    const { dbTotals, setDbTotals } = useDbTotalsStore((state) => ({
        dbTotals: state.dbTotals,
        setDbTotals: state.setDbTotals,
    }))
    // const [totals, setTotals] = useState<Totals>({ day: 0, week: 0, month: 0 })
    const animationState: string = 'happy1'

    // const fetchDataTotal = async () => {
    //     const totals = (await fetchTotalsData()) as {
    //         day: number
    //         week: number
    //         month: number
    //     }
    //     console.log(totals)
    //     setDbTotals(totals)
    // }

    useEffect(() => {
        updateDbTotalsStore()
        // fetchDataTotal()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue px-4">
            <Mom animationState={animationState} />
            <View className="flex flex-row mt-28 mb-4 justify-center">
                <VerticalChart />
            </View>
            <View className="flex flex-row justify-center">
                <View className="flex-1 flex-row justify-between items-center bg-custom-blue rounded-xl h-20 mt-4 p-4">
                    <Text className="text-2xl font-bold text-white">Today</Text>
                    <Text className="text-4xl font-bold text-white pr-6">
                        {dbTotals.day}h
                    </Text>
                </View>
                <View className="w-4" />

                <InputDialog />
            </View>
            <View className="flex flex-row justify-between">
                <View className="flex-1 flex-row justify-between items-center bg-custom-blue rounded-xl mt-4 p-4">
                    <Text className="text-lg font-bold text-white">Week</Text>
                    <Text className="text-2xl font-bold text-white">
                        {dbTotals.week}h
                    </Text>
                </View>
                <View className="w-4" />
                <View className="flex-1 flex-row justify-between items-center bg-custom-blue rounded-xl mt-4 p-4">
                    <Text className="text-lg font-bold text-white">Month</Text>
                    <Text className="text-2xl font-bold text-white">
                        {dbTotals.month}h
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
