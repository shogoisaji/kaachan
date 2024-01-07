import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    SafeAreaView,
    Button,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native'
import saveData from '../../dammy.json'
import { Icon } from '@rneui/themed'
import { fetchData, deleteData } from '../services/DatabaseService'
import { UpdateContext } from '../contexts/updateContext'

export const MainList = () => {
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

        console.log('fetchData:')
    }, [update])
    const items = fetchAllData.map((item: saveDataTypes) => {
        return (
            <TouchableOpacity
                onLongPress={() => {
                    deleteData(item.id)
                    setUpdate(!update)
                }}
            >
                <View className="flex flex-row w-auto h-20 justify-between items-center rounded-2xl px-4 my-1 mx-2 bg-custom-blue">
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
                    <Text className="text-xl w-16">
                        {item.time.toFixed(1)} h
                    </Text>
                </View>
            </TouchableOpacity>
        )
    })
    return (
        <SafeAreaView>
            <FlatList data={items} renderItem={({ item }) => item} />
        </SafeAreaView>
    )
}
