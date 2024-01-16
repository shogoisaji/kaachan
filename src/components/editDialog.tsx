import React, { useState } from 'react'
import Dialog from 'react-native-dialog'
import { View } from 'react-native'
import { Icon, Input } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
import { updateData as dataUpdate } from '../services/DatabaseService'
import { tags, timeNumbers } from '../config/config'
import {
    updateDbTotalsStore,
    updateTriggerStore,
    updateWeekDataStore,
} from '../../state/dbStore'
import { useSelectedDateStore } from '../../state/selectedDateStore'

type Props = {
    initialData: SaveDataTypes
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    onUpdate: (data: SaveDataTypes) => void
}

export const EditDialog: React.FC<Props> = ({
    initialData,
    visible,
    setVisible,
    onUpdate,
}) => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore()
    const [textIsNull, setTextIsNull] = useState<boolean>(false)
    const [text, setText] = useState<string>(initialData.title)
    const [timeNumber, setTimeNumber] = useState<number>(initialData.time)
    const [selectedTag, setSelectedTag] = useState<string>(initialData.tag)
    const { update, setUpdate } = updateTriggerStore()

    const handleCancel = () => {
        setText(initialData.title)
        setTimeNumber(initialData.time)
        setSelectedTag(initialData.tag)
        setVisible(false)
    }

    const handleConfirm = () => {
        if (text == '') {
            setTextIsNull(true)
            return
        }
        const updatedData: SaveDataTypes = {
            id: initialData.id,
            title: text,
            time: Number(timeNumber),
            tag: selectedTag,
            createdAt: initialData.createdAt,
        }
        dataUpdate(updatedData)
        updateDbTotalsStore(selectedDate)
        updateWeekDataStore(selectedDate)
        onUpdate(updatedData)
        setUpdate(!update)
        setVisible(false)
    }

    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title
                    style={{ fontSize: 24, fontWeight: 'bold', margin: 12 }}
                >
                    学習記録の編集
                </Dialog.Title>
                <Input
                    value={text}
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
                                    label={`${value} h`}
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
                <Dialog.Button label="Save" onPress={handleConfirm} />
            </Dialog.Container>
        </View>
    )
}
