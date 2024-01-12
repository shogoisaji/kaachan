import { View, Text, useWindowDimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { FontAwesome } from '@expo/vector-icons'
import { useContext, useEffect, useState } from 'react'
import { fetchWeekData } from '../services/DatabaseService'
import { currentDate, getMonday } from '../utils/utils'
import { useInsertStore } from '../../state/insertState'
import { useSelectedDateStore } from '../../state/appState'
import { updateWeekDataStore, weekDataStore } from '../../state/dbStore'

// interface UpdateContextType {
//     update: boolean
//     setUpdate: React.Dispatch<React.SetStateAction<boolean>>
// }

export const VerticalChart: React.FC = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const { weekData, setWeekData } = weekDataStore()
    const { isInserted } = useInsertStore((state) => ({
        isInserted: state.insertTrigger,
        setInsertTrigger: state.setInsertTrigger,
    }))
    const windowWidth = useWindowDimensions().width
    const windowHeight = useWindowDimensions().height
    // const [weeklyData, setWeeklyData] = useState<number[]>([])
    // const [targetDate, setTargetDate] = useState<Date>(currentDate)
    // const monday = getMonday(targetDate)

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
        datasets: [
            {
                data: weekData,
            },
        ],
    }

    const setCurrentDate = () => {
        setSelectedDate(currentDate())
    }

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
        <View className="flex-1 bg-custom-beige rounded-2xl p-3">
            <View className="flex flex-row items-center justify-center mb-2">
                <View className="flex flex-row absolute top-1 right-1">
                    <FontAwesome
                        name="calendar-minus-o"
                        size={24}
                        color="#00499A"
                        onPress={() => {
                            setCurrentDate()
                        }}
                    />
                </View>

                <FontAwesome
                    name="angle-left"
                    size={30}
                    color="#00499A"
                    onPress={() => prevWeek()}
                />
                <Text className="text-xl font-bold text-custom-darkblue mx-8">
                    Week
                </Text>
                <FontAwesome
                    name="angle-right"
                    size={30}
                    color="#00499A"
                    onPress={() => nextWeek()}
                />
            </View>
            <BarChart
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
                    backgroundColor: '#FFDD9B',
                    backgroundGradientFrom: '#FFDD9B',
                    backgroundGradientTo: '#FFDD9B',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                verticalLabelRotation={0}
            />
        </View>
    )
}
