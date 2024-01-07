import React, { useEffect, useState } from 'react'
import { Button, StyleProp, View, ViewStyle } from 'react-native'
import Rive, { Fit } from 'rive-react-native'

interface MomProps {
    animationState: string
}

export const Mom = ({ animationState }: MomProps) => {
    const [animationName, setAnimationName] = useState<string>('normal')

    const riveStyle: StyleProp<ViewStyle> = {
        width: 100,
        height: 100,
        transform: [{ scaleX: -1 }],
    }

    useEffect(() => {
        setAnimationName(animationState)
    }, [])

    return (
        <View className="flex-1 z-10 justify-end absolute top-12 left-4">
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
        </View>
    )
}
