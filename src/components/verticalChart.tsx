import { View, Text, useWindowDimensions } from 'react-native'
// import { BarChart } from 'react-native-chart-kit'
import { FontAwesome } from '@expo/vector-icons'
import { useContext, useEffect, useState } from 'react'
import { fetchWeekData } from '../services/DatabaseService'
import { currentDate, getMonday } from '../utils/utils'
import { useInsertStore } from '../../state/insertState'
import { useSelectedDateStore } from '../../state/appState'
import { updateWeekDataStore, weekDataStore } from '../../state/dbStore'
import { BarChart } from 'react-native-gifted-charts'

export const VerticalChart: React.FC = () => {
    const [spacing, setSpacing] = useState<number>(24)
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const { weekData, setWeekData } = weekDataStore()
    const { isInserted } = useInsertStore((state) => ({
        isInserted: state.insertTrigger,
        setInsertTrigger: state.setInsertTrigger,
    }))
    const windowWidth = useWindowDimensions().width
    const windowHeight = useWindowDimensions().height

    const daysLabel = (): string[] => {
        const monday = getMonday(selectedDate)
        const days = []
        for (let i = 0; i < 7; i++) {
            const targetDate = new Date(
                monday.getTime() + (i - 1) * 24 * 60 * 60 * 1000
            )
            const dayString = `${
                targetDate.getMonth() + 1
            }/${targetDate.getDate()}`
            days.push(dayString)
        }
        return days
    }

    const chartData = {
        labels: daysLabel(),
        data: weekData,
    }
    const todayLabel = `${new Date().getMonth() + 1}/${new Date().getDate()}`
    const barData = chartData.data.map((dataPoint, index) => ({
        value: dataPoint,
        label: chartData.labels[index],
        spacing: spacing,
        labelWidth: 0,
        labelTextStyle:
            chartData.labels[index] === todayLabel
                ? { color: '#00499A', fontWeight: 'bold' }
                : { color: 'gray' },
        frontColor: '#067CFF',
        topLabelComponent: () => (
            <View className="flex-col items-center w-10">
                <Text className="text-lg text-custom-darkblue">
                    {dataPoint === 0 ? '' : dataPoint}
                </Text>
                <View className="h-3" />
            </View>
        ),
    }))

    const nextWeek = () => {
        const newDate = new Date(
            selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000
        )
        setSelectedDate(newDate)
    }

    const prevWeek = () => {
        const newDate = new Date(
            selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000
        )
        setSelectedDate(newDate)
    }

    useEffect(() => {
        updateWeekDataStore(selectedDate)
    }, [selectedDate])
    return (
        <View className="flex-1 bg-custom-blue rounded-2xl p-3">
            <View className="flex flex-row items-center justify-center mb-2">
                <FontAwesome
                    name="angle-left"
                    size={30}
                    color="white"
                    onPress={() => prevWeek()}
                />
                <Text className="text-xl font-bold text-white mx-8">Week</Text>
                <FontAwesome
                    name="angle-right"
                    size={30}
                    color="white"
                    onPress={() => nextWeek()}
                />
            </View>
            <View className="bg-white pt-4 pb-2 rounded-xl">
                <BarChart
                    data={barData}
                    barWidth={16}
                    spacing={14}
                    roundedTop
                    hideRules
                    xAxisThickness={1}
                    xAxisColor={'gray'}
                    yAxisColor={'gray'}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: 'gray' }}
                    noOfSections={5}
                    maxValue={10}
                />
            </View>
            {/* <BarChart
                data={chartData}
                width={windowWidth * 0.85}
                height={windowHeight / 3.5}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix="h "
                showBarTops={false}
                showValuesOnTopOfBars={true}
                chartConfig={{
                    barPercentage: 0.4,
                    backgroundColor: '#067CFF',
                    backgroundGradientFrom: '#067CFF',
                    backgroundGradientTo: '#067CFF',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                verticalLabelRotation={0}
            /> */}
        </View>
    )
}
