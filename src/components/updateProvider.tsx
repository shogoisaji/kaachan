import React, { useState, ReactNode } from 'react'
import { UpdateContext } from '../contexts/updateContext'

interface Props {
    children: ReactNode
}

const UpdateProvider = ({ children }: Props) => {
    const [update, setUpdate] = useState(false)

    return (
        <UpdateContext.Provider value={{ update, setUpdate }}>
            {children}
        </UpdateContext.Provider>
    )
}

export default UpdateProvider
