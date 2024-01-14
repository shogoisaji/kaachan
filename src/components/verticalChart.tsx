import { View, Text, useWindowDimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { getMonday } from '../utils/utils'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import { updateWeekDataStore, weekDataStore } from '../../state/dbStore'
import { BarChart } from 'react-native-gifted-charts'
import dayjs from 'dayjs'

export const VerticalChart: React.FC = () => {
    const windowWidth = useWindowDimensions().width
    const [spacing, setSpacing] = useState<number>(24)
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const { weekData, setWeekData } = weekDataStore()

    const daysLabel = (): string[] => {
        const mondayString = getMonday(selectedDate)
        const monday = dayjs(mondayString)
        const days = []
        for (let i = 0; i < 7; i++) {
            const dayString = monday.add(i, 'day').format('D')
            days.push(dayString)
        }
        return days
    }

    const chartData = {
        labels: daysLabel(),
        data: weekData,
    }
    const todayLabel = dayjs().format('D')
    const barData = chartData.data.map((dataPoint, index) => ({
        value: dataPoint,
        label: chartData.labels[index],
        spacing: spacing,
        labelWidth: 0,
        labelTextStyle:
            chartData.labels[index] === todayLabel &&
            dayjs().format('M') === dayjs(selectedDate).format('M')
                ? {
                      color: '#00499A',
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginTop: -4,
                  }
                : { color: 'gray' },
        frontColor: dataPoint > 9.5 ? '#FF6A8C' : '#067CFF',
        topLabelComponent: () => (
            <View className="flex-col items-center w-10">
                <Text className="text-lg text-custom-darkblue">
                    {dataPoint === 0 || dataPoint === 10 ? '' : dataPoint}
                </Text>
                <View className="h-3" />
            </View>
        ),
    }))

    useEffect(() => {
        setSpacing(windowWidth / 7 - 33)
        updateWeekDataStore(selectedDate)
    }, [selectedDate])

    return (
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
    )
}
