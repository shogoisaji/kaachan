import { useState } from 'react'
import { UpdateContext } from '../contexts/updateContext'

const UpdateProvider = ({ children }) => {
    const [update, setUpdate] = useState(false)

    return (
        <UpdateContext.Provider value={{ update, setUpdate }}>
            {children}
        </UpdateContext.Provider>
    )
}

export default UpdateProvider
