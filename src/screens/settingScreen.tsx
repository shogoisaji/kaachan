import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/base'
import { SafeAreaView } from 'react-native-safe-area-context'

export const SettingScreen: React.FC = () => {
    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue">
            <View className="flex flex-row justify-between items-center mt-2">
                <View className="h-1 w-32 bg-custom-darkblue" />
                <Text className="text-2xl font-bold text-custom-darkblue">
                    Settings
                </Text>
                <View className="h-1 w-32 bg-custom-darkblue" />
            </View>
            <Button
                title="notice"
                titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                buttonStyle={{
                    backgroundColor: '#00499A',
                    borderRadius: 16,
                }}
                containerStyle={{
                    width: 150,
                }}
                onPress={() => {
                    // handlePress()
                }}
            />
        </SafeAreaView>
    )
}
