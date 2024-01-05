import React, { useEffect } from 'react'
import { createTable } from './services/DatabaseService'
import { MainPage } from './pages/mainPage'
import UpdateProvider from './components/UpdateProvider'

const App: React.FC = () => {
    useEffect(() => {
        createTable()
    }, [])

    return (
        <UpdateProvider>
            <MainPage />
        </UpdateProvider>
    )
}

export default App
