import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getMonday = (date: Date): Date => {
    const day: number = date.getDay() // 曜日を取得 0~6
    const diff: number = date.getDate() - day + (day === 0 ? -6 : 1) // 月曜日までの差分を計算
    return new Date(date.getFullYear(), date.getMonth(), diff + 1)
}

export const currentDate = () => dayjs().locale(dayjs.tz.guess()).toDate()
export const currentDateString = () => dayjs().locale(dayjs.tz.guess()).format()
