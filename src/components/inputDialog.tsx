import React, { useState } from 'react'
import Dialog from 'react-native-dialog'
import { TouchableOpacity, View } from 'react-native'
import { Icon, Input } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
import { insertData } from '../services/DatabaseService'
import { tags, timeNumbers } from '../config/config'
import { FontAwesome } from '@expo/vector-icons'
import { updateDbTotalsStore, updateWeekDataStore } from '../../state/dbStore'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import { getMomState } from '../utils/momState'
import { useMomStateStore } from '../../state/momStateStore'

export const InputDialog = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const { momState, setMomState } = useMomStateStore()
    const [visible, setVisible] = useState(false)
    const [textIsNull, setTextIsNull] = useState(false)
    const [text, setText] = useState('')
    const [timeNumber, setTimeNumber] = useState<number>(1.5)
    const [selectedTag, setSelectedTag] = useState(tags[0])

    const showDialog = () => {
        setTextIsNull(false)
        setSelectedTag(tags[0])
        setTimeNumber(1.5)
        setText('')
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleConfirm = async () => {
        if (text == '') {
            setTextIsNull(true)
            return
        }
        await insertData(text, timeNumber, selectedTag)
        updateDbTotalsStore(selectedDate)
        updateWeekDataStore(selectedDate)
        getMomState(setMomState)
        setVisible(false)
    }

    return (
        <View>
            <TouchableOpacity onPress={showDialog}>
                <View className="flex flex-row w-24 justify-center items-center bg-custom-pink rounded-xl h-20 mt-4 p-4">
                    <FontAwesome name="plus" size={40} color="white" />
                </View>
            </TouchableOpacity>
            <Dialog.Container visible={visible}>
                <Dialog.Title
                    style={{ fontSize: 24, fontWeight: 'bold', margin: 12 }}
                >
                    学習記録の登録
                </Dialog.Title>
                <Dialog.Description>
                    学習した内容と時間を入力してください
                </Dialog.Description>
                <Input
                    style={{
                        borderWidth: 1,
                        borderColor: textIsNull ? 'red' : 'lightgray',
                        borderRadius: 10,
                        padding: 10,
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="例) 英語の勉強"
                    onChangeText={(value) => setText(value)}
                />
                <View className="flex flex-row justify-evenly">
                    <View className="flex flex-col h-auto mb-4 items-center justify-between">
                        {tags.map((iconName, index) => (
                            <Icon
                                key={index}
                                name={iconName}
                                type="font-awesome-5"
                                color={
                                    selectedTag == iconName
                                        ? '#067CFF'
                                        : 'lightgray'
                                }
                                size={24}
                                onPress={() => setSelectedTag(iconName)}
                            />
                        ))}
                    </View>
                    <View className="items-center justify-center">
                        <Picker
                            style={{ height: 200, width: 150, marginTop: -30 }}
                            selectedValue={timeNumber}
                            onValueChange={(itemValue) =>
                                setTimeNumber(itemValue)
                            }
                        >
                            {timeNumbers.map((value) => (
                                <Picker.Item
                                    key={value}
                                    label={value + ' h'}
                                    value={value}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <Dialog.Button
                    label="Cancel"
                    onPress={handleCancel}
                    color="red"
                />
                <Dialog.Button label="Add" onPress={handleConfirm} />
            </Dialog.Container>
        </View>
    )
}
