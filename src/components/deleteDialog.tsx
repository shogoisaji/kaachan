import React, { useState } from 'react'
import Dialog from 'react-native-dialog'
import { View, Text } from 'react-native'
import { Icon, Input } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
import { updateData as dataUpdate } from '../services/DatabaseService'
import { tags, timeNumbers } from '../config/config'
import {
    updateAllRowStore,
    updateDbTotalsStore,
    updateWeekDataStore,
} from '../../state/dbStore'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import { deleteData } from '../services/DatabaseService'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../routes/route'
import { getMomState } from '../utils/momState'
import { useMomStateStore } from '../../state/momStateStore'

type Props = {
    data: SaveDataTypes
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    onDelete: (isDelete: boolean) => void
}

export const DeleteDialog: React.FC<Props> = ({
    data,
    visible,
    setVisible,
    onDelete,
}) => {
    const { selectedDate } = useSelectedDateStore()
    const { momState, setMomState } = useMomStateStore()
    const handleCancel = () => {
        setVisible(false)
    }
    const handleConfirm = () => {
        deleteData(data.id)
        onDelete(true)
        updateAllRowStore()
        updateDbTotalsStore(selectedDate)
        updateWeekDataStore(selectedDate)
        getMomState(setMomState)
        setVisible(false)
    }
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title
                    style={{ fontSize: 24, fontWeight: 'bold', margin: 12 }}
                >
                    Delete
                </Dialog.Title>
                <Dialog.Description style={{ fontSize: 18 }}>
                    このデータを削除しますか？
                </Dialog.Description>
                <Dialog.Button
                    label="Cancel"
                    onPress={handleCancel}
                    color="red"
                />
                <Dialog.Button label="Delete" onPress={handleConfirm} />
            </Dialog.Container>
        </View>
    )
}
