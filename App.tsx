import React, { useEffect } from 'react'
import { createTable } from './src/services/DatabaseService'
import UpdateProvider from './src/components/updateProvider'
import { RootRoutes } from './src/routes/route'

const App: React.FC = () => {
    useEffect(() => {
        createTable()
    }, [])

    return (
        <UpdateProvider>
            <RootRoutes />
        </UpdateProvider>
    )
}

export default App
