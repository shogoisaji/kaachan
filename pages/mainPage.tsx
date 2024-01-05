import React, { useState } from 'react'
import { View, Button, StyleProp, ViewStyle } from 'react-native'
import Rive, { Fit } from 'rive-react-native'
import { InputDialog } from '../components/inputDialog'
import { MainList } from '../components/mainList'

export const MainPage = () => {
    const [animationName, setAnimationName] = useState<string>('normal')
    const handleRiveState = (animation: string) => {
        setAnimationName(animation)
    }

    const riveStyle: StyleProp<ViewStyle> = { width: 100, height: 100 }

    return (
        <View className="flex-1 bg-custom-lightblue">
            <View className="">
                <MainList />
            </View>
            <View className="h-32">
                <Rive
                    resourceName="mom2"
                    artboardName="mom"
                    animationName={animationName}
                    autoplay={true}
                    fit={Fit.Contain}
                    style={riveStyle}
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
