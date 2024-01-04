import React from 'react'
import { View, SafeAreaView, Button, FlatList, Text } from 'react-native'
import saveData from '../dammy.json'
import { Icon } from '@rneui/themed'

export const MainList = () => {
    const items = saveData.map((item) => {
        return (
            <View className="flex flex-row w-auto h-20 justify-between items-center rounded-2xl px-4 my-1 mx-2 bg-custom-blue">
                <View className="flex flex-row items-center justify-start">
                    <View className="pr-5 pl-2">
                        <Icon
                            name={item.tag}
                            type="font-awesome"
                            color="white"
                            size={30}
                        />
                    </View>
                    <View className="flex flex-col justify-start w-52">
                        <Text
                            className="text-xl font-bold"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.title}
                        </Text>
                        <Text className="text-lg">
                            {new Date(item.createdAt).toLocaleDateString(
                                'ja-JP',
                                {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                }
                            )}
                        </Text>
                    </View>
                </View>
                <Text className="text-xl w-16">{item.time.toFixed(1)} h</Text>
            </View>
        )
    })
    return (
        <SafeAreaView>
            <FlatList
                data={items}
                renderItem={({ item }) => <View>{item}</View>}
            />
        </SafeAreaView>
    )
}
