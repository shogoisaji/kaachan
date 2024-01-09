import React, { useContext, useState } from 'react'
import Dialog from 'react-native-dialog'
import { View } from 'react-native'
import { Icon, Button, Input } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
import { insertData } from '../services/DatabaseService'
import { TextInput } from 'react-native-paper'
import { UpdateContext } from '../contexts/updateContext'
import { tags, timeNumbers } from '../config/config'

export const InputDialog = () => {
    const context = useContext(UpdateContext)
    if (!context) {
        throw new Error('UpdateContext is not provided')
    }
    const { update, setUpdate } = context
    const [visible, setVisible] = useState(false)
    const [textIsNull, setTextIsNull] = useState(false)
    const [text, setText] = useState('')
    const [timeNumber, setTimeNumber] = useState('1.5')
    const [selectedTag, setSelectedTag] = useState(tags[0])

    const showDialog = () => {
        setTextIsNull(false)
        setSelectedTag(tags[0])
        setTimeNumber('1.5')
        setText('')
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleConfirm = () => {
        if (text == '') {
            setTextIsNull(true)
            return
        }
        setUpdate(!update)
        insertData(
            text,
            Number(timeNumber),
            selectedTag,
            new Date().toISOString()
        )
        setVisible(false)
    }

    return (
        <View>
            <Button
                radius={'xl'}
                type="solid"
                buttonStyle={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: '#FF6A8C',
                }}
                onPress={showDialog}
            >
                <Icon
                    name="plus"
                    color="white"
                    size={28}
                    type="font-awesome-5"
                />
            </Button>

            <Dialog.Container visible={visible}>
                <Dialog.Title
                    style={{ fontSize: 24, fontWeight: 'bold', margin: 12 }}
                >
                    学習時間の登録
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
                    placeholder='例) "英語の勉強"'
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
