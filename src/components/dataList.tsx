import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { fetchAllData } from '../services/DatabaseService'
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes/route'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DataList'>
}

export const DataList: React.FC<Props> = ({ navigation }) => {
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        const fetchDataAsync = async () => {
            const data = await fetchAllData()
            setDataList(data)
        }
        fetchDataAsync()
    }, [])
    const items = dataList.map((item: SaveDataTypes, index: number) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                    navigation.navigate('Detail', { saveData: item })
                }
            >
                <View className="flex-1 flex-row w-auto h-20 justify-between items-center rounded-2xl px-4 my-4 mx-2 shadow-md shadow-blue-900 bg-custom-blue">
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
                <Text className="text-2xl w-16">{item.time.toFixed(1)} h</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View className="h-auto">
            <FlatList data={items} renderItem={({ item }) => item} />
        </View>
    )
}
