import {
    TouchableOpacity,
    View,
    Text,
    useWindowDimensions,
    FlatList,
    ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes/route'
import { useEffect, useState } from 'react'
import { Icon } from '@rneui/themed'
import { updateTriggerStore } from '../../state/dbStore'
import dayjs from 'dayjs'
import { fetchAllData } from '../services/DatabaseService'

type Props = NativeStackScreenProps<RootStackParamList, 'HistoryScreen'>

export const HistoryScreen: React.FC<Props> = ({ navigation }) => {
    const windowWidth = useWindowDimensions().width
    const [loading, setLoading] = useState(true)
    const [allRowData, setAllRowData] = useState<SaveDataTypes[]>([])
    const { update, setUpdate } = updateTriggerStore()
    const windowHeight = useWindowDimensions().height
    useEffect(() => {
        let isMounted = true
        const getRowData = async () => {
            setLoading(true)
            const data = await fetchAllData()
            if (isMounted) {
                setAllRowData(data)
                setLoading(false)
            }
        }
        getRowData()
        return () => {
            isMounted = false
        }
    }, [update])
    const items = allRowData.map((item: SaveDataTypes, index: number) => {
        if (loading) return <View className="flex-1 bg-custom-lightblue" />
        return (
            <View className={`${windowWidth > 800 ? 'px-60' : 'px-0'}`}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                        navigation.navigate('Detail', { saveData: item })
                    }
                >
                    <View className="flex-1 flex-row justify-between items-center rounded-2xl  shadow shadow-blue-900 px-4 py-2 mx-4 my-2 bg-custom-blue">
                        <View className="flex flex-row items-center justify-start">
                            <View className="pr-5 pl-2">
                                <Icon
                                    name={item.tag}
                                    type="font-awesome-5"
                                    color="white"
                                    size={30}
                                />
                            </View>
                            <View className="flex flex-col justify-start w-44">
                                <Text
                                    className="text-xl font-bold"
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.title}
                                </Text>
                                <Text className="text-lg">
                                    {dayjs(item.createdAt).format('YYYY/MM/DD')}
                                </Text>
                            </View>
                        </View>
                        <Text className="text-3xl font-bold text-white">
                            {item.time.toFixed(1)} h
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })
    return (
        <View className="flex-1 bg-custom-lightblue">
            <ImageBackground
                source={require('../../assets/bg.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <SafeAreaView className="flex-1">
                    <View className="flex flex-row justify-between items-center mt-2">
                        <View className="flex-1 h-1 bg-custom-darkblue" />
                        <Text className="text-2xl font-bold text-custom-darkblue px-8">
                            History
                        </Text>
                        <View className="flex-1 h-1 bg-custom-darkblue" />
                    </View>
                    <View style={{ height: windowHeight - 96 }}>
                        <View className="flex-1 py-4">
                            <FlatList
                                data={items}
                                renderItem={({ item }) => item}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}
