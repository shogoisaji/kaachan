import React, { useState, createContext } from 'react'

export const NavigationContext = createContext<
    [string, React.Dispatch<React.SetStateAction<string>>] | null
>(null)

const [navigation, setNavigation] = useState('home')
