import React from 'react'
import Dialog from 'react-native-dialog'
import { View } from 'react-native'
import {
    updateDbTotalsStore,
    updateTriggerStore,
    updateWeekDataStore,
} from '../../state/dbStore'
import { useSelectedDateStore } from '../../state/selectedDateStore'
import { deleteData } from '../services/DatabaseService'
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
    const { update, setUpdate } = updateTriggerStore()

    const handleCancel = () => {
        setVisible(false)
    }
    const handleConfirm = () => {
        deleteData(data.id)
        setUpdate(!update)
        updateDbTotalsStore(selectedDate)
        updateWeekDataStore(selectedDate)
        getMomState(setMomState)
        onDelete(true)
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
