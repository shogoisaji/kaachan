import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getMonday = (date: string): string => {
    const convertDate = dayjs(date)
    const day: number = convertDate.day() // 曜日を取得 0(日曜日)~6(土曜日)
    const diff: number = day === 0 ? 6 : day - 1 // 日曜日の場合は6を減算、それ以外は1を減算
    return convertDate.subtract(diff, 'day').format('YYYY-MM-DD')
}

export const currentDateString = () =>
    dayjs().locale(dayjs.tz.guess()).format().slice(0, 19) //2024-01-15T01:53:28
