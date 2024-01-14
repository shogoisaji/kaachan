import React, { useEffect, useState } from 'react'
import { Button, StyleProp, View, ViewStyle } from 'react-native'
import Rive, { Fit } from 'rive-react-native'

interface MomProps {
    animationState: string
}

export const Mom = ({ animationState }: MomProps) => {
    const riveStyle: StyleProp<ViewStyle> = {
        width: 100,
        height: 100,
        transform: [{ scaleX: -1 }],
    }

    return (
        <View className="flex h-32 items-end">
            <Rive
                resourceName="mom_animation"
                artboardName="mom"
                animationName={animationState}
                autoplay={true}
                fit={Fit.FitHeight}
                style={riveStyle}
            />
        </View>
        // </View>
    )
}
