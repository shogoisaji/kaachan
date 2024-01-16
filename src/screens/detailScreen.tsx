import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import { Icon, Button } from '@rneui/base'
import { RootStackParamList } from '../routes/route'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import moment from 'moment'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import { EditDialog } from '../components/editDialog'
import { DeleteDialog } from '../components/deleteDialog'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail' | 'HomeDetail'>

export const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false)
    const [deleteDialogVisible, setDeleteDialogVisible] =
        useState<boolean>(false)
    const { saveData } = route.params
    const [timeNumber, setTimeNumber] = useState<number>(saveData.time)
    const [selectedTag, setSelectedTag] = useState<string>(saveData.tag)
    const [text, setText] = useState<string>(saveData.title)

    const handleUpdate = (data: SaveDataTypes) => {
        setText(data.title)
        setTimeNumber(data.time)
        setSelectedTag(data.tag)
    }

    const handleDelete = (isDelete: boolean) => {
        if (isDelete) {
            navigation.navigate('HistoryScreen')
        }
        console.log('delete')
    }
    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={{ width: '100%', height: '100%' }}
        >
            <SafeAreaView className="flex-1">
                <DeleteDialog
                    data={saveData}
                    visible={deleteDialogVisible}
                    setVisible={setDeleteDialogVisible}
                    onDelete={handleDelete}
                />
                <EditDialog
                    initialData={saveData}
                    visible={editDialogVisible}
                    setVisible={setEditDialogVisible}
                    onUpdate={handleUpdate}
                />
                <View className="flex flex-row justify-between items-center mt-2 mb-4">
                    <View className="flex-1 h-1 bg-custom-darkblue" />
                    <Text className="text-2xl font-bold text-custom-darkblue px-8">
                        Detail
                    </Text>
                    <View className="flex-1 h-1 bg-custom-darkblue" />
                </View>
                <View className="m-8">
                    <View className="flex-row justify-center p-4 shadow shadow-blue-800 bg-custom-blue rounded-xl">
                        <Text className=" text-3xl font-bold text-white">
                            {text}
                        </Text>
                    </View>
                    <View className="flex flex-row justify-evenly my-4">
                        <View className="flex-1 h-auto items-center justify-center mr-4 p-4 shadow shadow-blue-800 bg-custom-blue rounded-xl">
                            <Icon
                                name={selectedTag}
                                type="font-awesome-5"
                                color={'white'}
                                size={40}
                            />
                        </View>
                        <View className="flex-1 items-center justify-center p-4 shadow shadow-blue-800 bg-custom-blue rounded-xl ">
                            <Text className="text-4xl text-white font-bold">
                                {timeNumber} h
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row justify-center p-4 shadow shadow-blue-800 bg-custom-blue rounded-xl">
                        <Text className="text-white text-2xl font-bold">
                            {moment(saveData.createdAt).format('YYYY/MM/DD')}
                        </Text>
                    </View>
                    <View className="flex-row justify-between mt-8">
                        <View className="bg-custom-pink rounded-xl shadow shadow-red-500">
                            <Button
                                title="Delete"
                                titleStyle={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                }}
                                buttonStyle={{
                                    backgroundColor: '#FF6A8C',
                                    borderRadius: 12,
                                }}
                                containerStyle={{
                                    width: 150,
                                }}
                                onPress={() => {
                                    setDeleteDialogVisible(true)
                                }}
                            />
                        </View>
                        <View className="bg-custom-darkblue rounded-xl shadow shadow-blue-800">
                            <Button
                                title="Edit"
                                titleStyle={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                }}
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
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
