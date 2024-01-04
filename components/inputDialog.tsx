import React, { useState } from 'react'
import Dialog from 'react-native-dialog'
import { View } from 'react-native'
import { Icon, Button } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'

export const InputDialog = () => {
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('')
    const [number, setNumber] = useState('0.5')
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
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleConfirm = () => {
        // 確認ボタンを押したときの処理
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
                <Dialog.Input
                    placeholder='例) "英語の勉強"'
                    onChangeText={(value) => setText(value)}
                />
                <Picker
                    style={{ height: 200, marginTop: -30 }}
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
