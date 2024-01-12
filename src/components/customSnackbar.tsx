import React from 'react'
import { Button, Snackbar } from 'react-native-paper'

export const CustomSnackbar = () => {
    const [snackVisible, setSnackVisible] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const onToggleSnackBar = () => setSnackVisible(!visible)
    const onDismissSnackBar = () => setSnackVisible(false)

    return (
        <Snackbar
            visible={snackVisible}
            onDismiss={onDismissSnackBar}
            duration={1000}
            // action={{
            //     label: 'Undo',
            //     onPress: () => {
            //         // Do something
            //     },
            // }}
        >
            Hey there! I'm a Snackbar.
        </Snackbar>
    )
}
