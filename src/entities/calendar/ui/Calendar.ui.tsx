import CalendarIcon from '../../../shared/ui/icons/calendar'
import { getMonthDays } from '../../../shared/lib/getDateInfo'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedDate, selectSelectTempDate } from '../model/selectors'
import { selectDate, selectTempDate } from '../model/calendarSlice'
import { getFormattedDateFromISO, getReplacedDate } from '../../../shared/lib/dateFormatter'
import { useState } from 'react'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function Calendar() {
  const selectedDate = useSelector(selectSelectedDate)
  const [calendarIsOpen, setCalendarIsOpen] = useState(false)

  return (
    <div className="">
      <button
        className="flex items-center w-full h-12 my-2 p-3 rounded-xl cursor-pointer bg-zinc-800 hover:bg-zinc-700"
        onClick={() => setCalendarIsOpen(!calendarIsOpen)}
      >
        <CalendarIcon color={'text-orange-500'} />
        {getFormattedDateFromISO(selectedDate)}
      </button>
      {calendarIsOpen && <CalendarGrid />}
    </div>
  )
}

function CalendarGrid() {
  const dispatch = useDispatch()
  const tempDate = useSelector(selectSelectTempDate)
  const selectedDate = useSelector(selectSelectedDate)

  const { offset, days } = getMonthDays(tempDate.year, tempDate.month)

  function handleChangeDate(operator: '+' | '-') {
    if (operator === '+') {
      if (tempDate.month === 11) {
        dispatch(selectTempDate({ month: 0, year: tempDate.year + 1 }))
      } else {
        dispatch(selectTempDate({ month: tempDate.month + 1, year: tempDate.year }))
      }
    }
    if (operator === '-') {
      if (tempDate.month === 0) {
        dispatch(selectTempDate({ month: 11, year: tempDate.year - 1 }))
      } else {
        dispatch(selectTempDate({ month: tempDate.month - 1, year: tempDate.year }))
      }
    }
  }

  function isSelectedDate(day: number) {
    return (
      day === new Date(getReplacedDate(selectedDate)).getDate() &&
      tempDate.month === new Date(getReplacedDate(selectedDate)).getMonth() &&
      tempDate.year === new Date(getReplacedDate(selectedDate)).getFullYear()
    )
  }

  function isToday(day: number) {
    return (
      day === Number(new Date().getDate()) &&
      tempDate.month === new Date().getMonth() &&
      tempDate.year === new Date().getFullYear()
    )
  }

  return (
    <div className="p-3 rounded-xl bg-zinc-800">
      <div className="flex justify-between items-center">
        <button
          className="w-7 h-7 rounded-lg text-center hover:bg-zinc-500"
          onClick={() => handleChangeDate('-')}
        >
          &lt;
        </button>
        <span className="text-sm">
          {new Date(tempDate.year, tempDate.month).toLocaleString('ru-RU', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          className="w-7 h-7 rounded-lg text-center hover:bg-zinc-500"
          onClick={() => handleChangeDate('+')}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 my-3 text-center text-sm text-zinc-400">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: offset }).map((_, ind) => (
          <div key={ind} />
        ))}

        {days.map((day) => {
          return (
            <button
              className={`
              aspect-square
              rounded-xl
              text-sm
              text-white
              hover:bg-zinc-700
              focus:outline-none
              focus:ring-2
              focus:ring-orange-500
              ${isSelectedDate(day) ? 'outline-none ring-2 ring-orange-500' : ''}
              ${isToday(day) ? 'bg-orange-500/50 outline-none ring-2 ring-orange-500/60' : ''}
              
            `}
              onClick={() =>
                dispatch(
                  selectDate(
                    `${tempDate.year}-${tempDate.month < 10 ? '0' : ''}${tempDate.month + 1}-${day}T14:30:00Z`
                  )
                )
              } // исправить вот это!!!
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
