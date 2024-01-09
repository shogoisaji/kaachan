import { Dimensions, View, Text, useWindowDimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

export const VerticalChart = () => {
    const windowWidth = useWindowDimensions().width
    const windowHeight = useWindowDimensions().height
    const data = {
        labels: ['12/11', '12/12', '12/13', '12/14', '12/15', '12/16', '12/17'],
        datasets: [
            {
                data: [2.5, 4.5, 2.5, 8.0, 2.0, 4.5, 5.5],
            },
        ],
    }
    return (
        <BarChart
            // style={{ borderRadius: 0 }}
            data={data}
            width={windowWidth}
            height={windowHeight / 3.5}
            fromZero={true}
            yAxisLabel=""
            yAxisSuffix="h "
            showBarTops={false}
            showValuesOnTopOfBars={true}
            chartConfig={{
                barPercentage: 0.4,
                backgroundColor: '#FFDD9B',
                backgroundGradientFrom: '#F5F2E7',
                backgroundGradientTo: '#F5F2E7',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            verticalLabelRotation={0}
        />
    )
}
