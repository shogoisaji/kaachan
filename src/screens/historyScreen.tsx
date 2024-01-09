import {
    TouchableOpacity,
    View,
    Text,
    useWindowDimensions,
    FlatList,
} from 'react-native'
import { DataList } from '../components/dataList'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes/route'
import { useContext, useEffect, useState } from 'react'
import { UpdateContext } from '../contexts/updateContext'
import { fetchData } from '../services/DatabaseService'
import { Icon } from '@rneui/themed'

type Props = NativeStackScreenProps<RootStackParamList, 'History'>

export const HistoryScreen: React.FC<Props> = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height
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
        <SafeAreaView className="flex-1 bg-custom-lightblue">
            <View className="flex flex-row justify-between items-center mt-2">
                <View className="h-1 w-32 bg-custom-darkblue" />
                <Text className="text-2xl font-bold text-custom-darkblue">
                    History
                </Text>
                <View className="h-1 w-32 bg-custom-darkblue" />
            </View>
            <View style={{ height: windowHeight - 96 }}>
                <View className="h-auto">
                    <FlatList data={items} renderItem={({ item }) => item} />
                </View>
            </View>
        </SafeAreaView>
    )
}
