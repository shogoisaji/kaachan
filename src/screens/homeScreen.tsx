import { View } from 'react-native'
import { InputDialog } from '../components/inputDialog'
import { Mom } from '../components/mom'
import { VerticalChart } from '../components/verticalChart'
import { SafeAreaView } from 'react-native-safe-area-context'

export const HomeScreen: React.FC = () => {
    const animationState: string = 'happy1'
    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue">
            <Mom animationState={animationState} />
            <View className="flex flex-row mt-28 justify-center">
                <VerticalChart />
            </View>
            <View className="absolute bottom-4 right-4">
                <InputDialog />
            </View>
        </SafeAreaView>
    )
}
