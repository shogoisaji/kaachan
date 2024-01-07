import React, { useEffect } from 'react'
import { createTable } from './src/services/DatabaseService'
import UpdateProvider from './src/components/updateProvider'
import { BottomNav } from './src/components/bottomNavigation'

const App: React.FC = () => {
    useEffect(() => {
        createTable()
    }, [])

    return (
        <UpdateProvider>
            <BottomNav />
        </UpdateProvider>
    )
}

export default App
