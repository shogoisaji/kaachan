import { View } from 'react-native'
import { InputDialog } from '../components/inputDialog'
import { MainList } from '../components/mainList'
import { Mom } from '../components/mom'
import { useWindowDimensions } from 'react-native'

export const HomePage = () => {
    const windowHeight = useWindowDimensions().height

    const animationState: string = 'happy1'
    return (
        <View className="flex-1 bg-custom-lightblue">
            <Mom animationState={animationState} />
            <View style={{ marginTop: windowHeight / 2 }}>
                <MainList />
            </View>

            <View className="absolute bottom-4 right-4">
                <InputDialog />
            </View>
        </View>
    )
}
