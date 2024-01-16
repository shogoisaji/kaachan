import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    useWindowDimensions,
} from 'react-native'
import { InputDialog } from '../components/inputDialog'
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
import { MomLottie } from '../components/momLottie'

export const HomeScreen: React.FC = () => {
    const windowWidth = useWindowDimensions().width
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
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
                        <View className="flex-row justify-center items-end mb-4 px-4">
                            <View className="z-50">
                                <MomLottie />
                            </View>
                            <View
                                className="absolute justify-center items-start left-0 h-16 shadow-sm shadow-blue-900 bg-custom-lightblue"
                                style={{ width: windowWidth / 2 }}
                            />
                            <View className="absolute shadow-sm shadow-blue-900 bg-custom-lightblue  w-32 h-32 rounded-full" />
                            <View
                                className="absolute justify-center items-start left-0 h-16 bg-custom-lightblue"
                                style={{ width: windowWidth / 2 }}
                            />
                            <View className="absolute bg-custom-lightblue  w-32 h-32 rounded-full" />
                            <View className="absolute left-1 bottom-2">
                                <Image
                                    source={require('../../assets/logo.png')}
                                    style={{
                                        width: windowWidth / 2.7,
                                        height: 50,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                            <View className=" absolute bottom-2 right-6">
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
                                        <Text className="-mb-1 text-4xl font-bold text-custom-darkblue items-end">
                                            {dayjs().format('M / D')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-col mb-3 mx-4 px-4 pb-4 pt-2 justify-center shadow shadow-blue-800 bg-custom-blue rounded-2xl">
                            <DateController />
                            <VerticalChart />
                        </View>
                        <View
                            className={`${
                                windowWidth > 800 ? 'px-60' : 'px-0'
                            }`}
                        >
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
                        </View>
                        <View className="h-8" />
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}
