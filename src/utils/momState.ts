import { fetchAllData, fetchSevenDaysData } from '../services/DatabaseService'

export const getMomState = async (
    setMomStateStore: (state: string) => void
) => {
    const state = await checkMomState()
    console.log('mom', state)
    setMomStateStore(state)
}

const checkFirst = async () => {
    const allFetch = await fetchAllData()
    if (allFetch.length === 0) {
        return true
    }
}
//
// good 5~  happy2
// good 3~4 happy1
//   any    normal
// bad  3~4 angry1
// bad  5~  angry2
//
export const checkMomState = async (): Promise<string> => {
    const first = await checkFirst()
    if (first) {
        return 'normal'
    }
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
        if (consecutiveData.days > 4) {
            return 'happy2'
        } else if (consecutiveData.days > 2) {
            return 'happy1'
        } else {
            return 'normal'
        }
    } else {
        if (consecutiveData.days > 4) {
            return 'angry2'
        } else if (consecutiveData.days > 2) {
            return 'angry1'
        } else {
            return 'normal'
        }
    }
}
