import { View, Text, SafeAreaView } from 'react-native'
import { Icon, Input, Button } from '@rneui/base'
import { RootStackParamList } from '../routes/route'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import moment from 'moment'
import { Picker } from '@react-native-picker/picker'
import { tags, timeNumbers } from '../config/config'
import { deleteData } from '../services/DatabaseService'
import {
    updateAllRowStore,
    updateDbTotalsStore,
    updateWeekDataStore,
} from '../../state/dbStore'
import { useSelectedDateStore } from '../../state/appState'
import { EditDialog } from '../components/editDialog'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail' | 'HomeDetail'>

export const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false)
    const { selectedDate } = useSelectedDateStore()
    const { saveData } = route.params
    const [timeNumber, setTimeNumber] = useState<number>(saveData.time)
    const [selectedTag, setSelectedTag] = useState<string>(saveData.tag)
    const [text, setText] = useState<string>(saveData.title)
    const [textIsNull, setTextIsNull] = useState<boolean>(false)

    const showEditDialog = () => {
        setTextIsNull(false)
        setEditDialogVisible(true)
    }

    const handleEditDialogCancel = () => {
        setEditDialogVisible(false)
    }

    const validateText = (text: string): boolean => {
        return text.trim().length > 0
    }

    const handleUpdate = (data: SaveDataTypes) => {
        setText(data.title)
        setTimeNumber(data.time)
        setSelectedTag(data.tag)
    }

    const handleDelete = () => {
        deleteData(saveData.id)
        updateAllRowStore()
        updateDbTotalsStore()
        updateWeekDataStore(selectedDate)
        navigation.navigate('HistoryScreen')
    }
    return (
        <SafeAreaView className="flex-1 bg-custom-lightblue">
            <EditDialog
                initialData={saveData}
                visible={editDialogVisible}
                setVisible={setEditDialogVisible}
                onUpdate={handleUpdate}
            />
            <View className="flex flex-row justify-between items-center mt-2 mb-4">
                <View className="h-1 w-32 bg-custom-darkblue" />
                <Text className="text-2xl font-bold text-custom-darkblue">
                    Detail
                </Text>
                <View className="h-1 w-32 bg-custom-darkblue" />
            </View>
            {/* <View className="flex-row justify-start m-4">
                <Icon
                    name="chevron-left"
                    color="#00499A"
                    size={32}
                    type="font-awesome-5"
                    onPress={() => navigation.goBack()}
                />
            </View> */}
            <View className="m-8">
                <View className="flex-row justify-center p-4 bg-custom-blue rounded-xl">
                    <Text className=" text-3xl font-bold text-white">
                        {text}
                    </Text>
                </View>
                <View className="flex flex-row justify-evenly my-4">
                    <View className="flex-1 h-auto items-center justify-center mr-4 p-4 bg-custom-blue rounded-xl">
                        <Icon
                            name={selectedTag}
                            type="font-awesome-5"
                            color={'white'}
                            size={40}
                        />
                    </View>
                    <View className="flex-1 items-center justify-center p-4 bg-custom-blue rounded-xl ">
                        <Text className="text-4xl text-white font-bold">
                            {timeNumber} h
                        </Text>
                    </View>
                </View>
                <View className="flex-row justify-center p-4 bg-custom-blue rounded-xl">
                    <Text className="text-white text-2xl font-bold">
                        {moment(saveData.createdAt).format('YYYY/MM/DD')}
                    </Text>
                </View>
                <View className="flex-row justify-between mt-8">
                    <Button
                        title="Delete"
                        titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                        buttonStyle={{
                            backgroundColor: '#FF6A8C',
                            borderRadius: 12,
                        }}
                        containerStyle={{
                            width: 150,
                        }}
                        onPress={() => {
                            handleDelete()
                        }}
                    />
                    <Button
                        title="Edit"
                        titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                        buttonStyle={{
                            backgroundColor: '#00499A',
                            borderRadius: 12,
                        }}
                        containerStyle={{
                            width: 150,
                        }}
                        onPress={() => {
                            setEditDialogVisible(true)
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
