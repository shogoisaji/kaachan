import React from 'react'

interface UpdateContextType {
    update: boolean
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateContext = React.createContext<UpdateContextType | undefined>(
    undefined
)
