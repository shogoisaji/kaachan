import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { fetchData } from '../services/DatabaseService'
import { UpdateContext } from '../contexts/updateContext'
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes/route'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DataList'>
}

export const DataList: React.FC<Props> = ({ navigation }) => {
    const context = useContext(UpdateContext)
    if (!context) {
        throw new Error('UpdateContext is not provided')
    }
    const { update, setUpdate } = context
    const [fetchAllData, setFetchAllData] = useState([])
    useEffect(() => {
        const fetchDataAsync = async () => {
            const data = await fetchData()
            setFetchAllData(data)
        }
        fetchDataAsync()
    }, [update])
    const items = fetchAllData.map((item: SaveDataTypes, index: number) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Detail', { saveData: item })
                }
            >
                <View
                    className={`flex flex-row w-auto h-20 justify-between items-center rounded-2xl px-4 my-1 mx-2 bg-custom-blue ${
                        index == 0 ? 'mt-4' : 'mt-1'
                    }`}
                >
                    <View className="flex flex-row items-center justify-start">
                        <View className="pr-5 pl-2">
                            <Icon
                                name={item.tag}
                                type="font-awesome-5"
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
                    <Text className="text-2xl w-16">
                        {item.time.toFixed(1)} h
                    </Text>
                </View>
                <View
                    className={`
                    ${index == fetchAllData.length - 1 ? 'h-24' : 'h-0'}
                    `}
                ></View>
            </TouchableOpacity>
        )
    })
    return (
        <View className="h-auto">
            <FlatList data={items} renderItem={({ item }) => item} />
        </View>
    )
}
