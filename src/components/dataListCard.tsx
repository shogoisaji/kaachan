import React from 'react'
import { View, Text } from 'react-native'

export const DataListCard = (saveData: SaveDataTypes) => {
    return (
        <View>
            <Text>{saveData.title}</Text>
            <Text>{saveData.time}</Text>
            <Text>{saveData.createdAt}</Text>
        </View>
    )
}
