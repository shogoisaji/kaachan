import React, { useContext, useState } from 'react'
import Dialog from 'react-native-dialog'
import { View } from 'react-native'
import { Icon, Button, Input } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
import { insertData } from '../services/DatabaseService'
import { TextInput } from 'react-native-paper'
import { UpdateContext } from '../contexts/updateContext'

export const InputDialog = () => {
    const tags = ['cat', 'dove', 'horse', 'dog', 'otter']
    const { update, setUpdate } = useContext(UpdateContext)
    const [visible, setVisible] = useState(false)
    const [textIsNull, setTextIsNull] = useState(false)
    const [text, setText] = useState('')
    const [number, setNumber] = useState('1.5')
    const [tag, setTag] = useState(tags[0])
    const numbers = [
        '0.5',
        '1.0',
        '1.5',
        '2.0',
        '2.5',
        '3.0',
        '3.5',
        '4.0',
        '4.5',
        '5.0',
        '5.5',
        '6.0',
        '6.5',
        '7.0',
        '7.5',
        '8.0',
    ]

    const showDialog = () => {
        setTextIsNull(false)
        setTag(tags[0])
        setNumber('1.5')
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
        insertData(text, Number(number), tag, new Date().toISOString())
        setVisible(false)
    }

    return (
        <View>
            <Button
                radius={'xl'}
                type="solid"
                buttonStyle={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: '#FF6A8C',
                }}
                titleStyle={{ fontSize: 24 }}
                iconRight={true}
                onPress={showDialog}
            >
                Add
                <Icon name="add" color="white" />
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
                                    tag == iconName ? '#067CFF' : 'lightgray'
                                }
                                size={24}
                                onPress={() => setTag(iconName)}
                            />
                        ))}
                    </View>
                    <View className="items-center justify-center">
                        <Picker
                            style={{ height: 200, width: 150, marginTop: -30 }}
                            selectedValue={number}
                            onValueChange={(itemValue) => setNumber(itemValue)}
                        >
                            {numbers.map((value) => (
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
