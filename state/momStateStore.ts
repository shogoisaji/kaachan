import { create } from 'zustand'

type State = {
    momState: string
    setMomState: (state: string) => void
}

export const useMomStateStore = create<State>((set) => ({
    momState: 'normal',
    setMomState: (state: string) => set(() => ({ momState: state })),
}))
