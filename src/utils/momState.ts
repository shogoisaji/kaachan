import { useMomStateStore } from '../../state/momStateStore'
import { fetchSevenDaysData } from '../services/DatabaseService'

export const getMomState = async (
    setMomStateStore: (state: string) => void
) => {
    const state = await checkMomState()
    console.log('mom', state)
    setMomStateStore(state)
}

export const checkMomState = async (): Promise<string> => {
    const sevenDaysData = await fetchSevenDaysData()
    const consecutiveData = {
        isGood: false,
        days: 0,
    }
    for (let i = 0; i < sevenDaysData.length; i++) {
        /// good
        if (sevenDaysData[0] > 0) {
            consecutiveData.isGood = true
            if (sevenDaysData[i] > 0) {
                consecutiveData.days++
            } else {
                break
            }
        }
        /// bad
        else {
            if (sevenDaysData[i] === 0) {
                consecutiveData.days++
            } else {
                break
            }
        }
    }
    if (consecutiveData.isGood) {
        if (consecutiveData.days > 5) {
            return 'happy2'
        } else if (consecutiveData.days > 2) {
            return 'happy1'
        } else {
            return 'normal'
        }
    } else {
        if (consecutiveData.days > 3) {
            return 'angry2'
        } else if (consecutiveData.days > 1) {
            return 'angry1'
        } else {
            return 'normal'
        }
    }
}
