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
import { fetchAllData } from '../services/DatabaseService'
import { Icon } from '@rneui/themed'
import { AllRowStore, updateAllRowStore } from '../../state/dbStore'

type Props = NativeStackScreenProps<RootStackParamList, 'HistoryScreen'>

export const HistoryScreen: React.FC<Props> = ({ navigation }) => {
    const { allRow, setAllRow } = AllRowStore()
    const windowHeight = useWindowDimensions().height
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        updateAllRowStore()
    }, [])
    const items = allRow.map((item: SaveDataTypes, index: number) => {
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
                    ${index == dataList.length - 1 ? 'h-24' : 'h-0'}
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
