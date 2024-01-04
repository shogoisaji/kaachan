import React from 'react'
import { Text, View, Button } from 'react-native'
import Rive, { Fit } from 'rive-react-native'
// import { FAB } from 'react-native-paper'
import { InputDialog } from './components/inputDialog'
import { MainList } from './components/mainList'

export default function App() {
    const [animationName, setAnimationName] = React.useState('normal')
    const handleRiveState = (animation) => {
        setAnimationName(animation)
    }

    return (
        <View className="h-full bg-custom-lightblue">
            <View>
                <MainList />
            </View>
            <View className="h-32">
                <Rive
                    resourceName="mom2"
                    artboardName="mom"
                    animationName={animationName}
                    autoplay={true}
                    fit={Fit.Contain}
                    style={{ width: 100, height: 100 }}
                />
            </View>
            <View className="flex flex-row">
                <Button
                    onPress={() => handleRiveState('happy2')}
                    title="happy2"
                ></Button>
                <Button
                    onPress={() => handleRiveState('happy1')}
                    title="happy1"
                ></Button>
                <Button
                    onPress={() => handleRiveState('normal')}
                    title="normal"
                ></Button>
                <Button
                    onPress={() => handleRiveState('angry1')}
                    title="angry1"
                ></Button>
                <Button
                    onPress={() => handleRiveState('angry2')}
                    title="angry2"
                ></Button>
            </View>
            <View className="absolute bottom-8 right-8">
                <InputDialog />
            </View>
        </View>
    )
}
