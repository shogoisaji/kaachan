import React, { useEffect } from 'react'
import { createTable } from './src/services/DatabaseService'
import { RootRoutes } from './src/routes/route'

const App: React.FC = () => {
    useEffect(() => {
        createTable()
    }, [])

    return <RootRoutes />
}

export default App
