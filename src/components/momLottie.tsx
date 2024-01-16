import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { useMomStateStore } from '../../state/momStateStore'

export const MomLottie = () => {
    const { momState, setMomState } = useMomStateStore()
    const [animationState, setAnimationState] = useState<string>(
        require('../../assets/mom_happy1.json')
    )
    useEffect(() => {
        switch (momState) {
            case 'happy2':
                setAnimationState(require('../../assets/mom_happy2.json'))
                break
            case 'happy1':
                setAnimationState(require('../../assets/mom_happy1.json'))
                break
            case 'normal':
                setAnimationState(require('../../assets/mom_normal.json'))
                break
            case 'angry1':
                setAnimationState(require('../../assets/mom_angry1.json'))
                break
            case 'angry2':
                setAnimationState(require('../../assets/mom_angry2.json'))
                break
            default:
                setAnimationState(require('../../assets/mom_normal.json'))
                break
        }
    }),
        [momState]
    return (
        <LottieView
            source={animationState}
            style={{ width: 130, height: 130 }}
            autoPlay
            loop
        />
    )
}
