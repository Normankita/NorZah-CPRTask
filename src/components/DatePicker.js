import { useEffect, useRef, useState } from 'react'
import './DatePicker.css'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const parseISO = (str) => {
  if (!str) return null
  const [y, m, d] = str.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

const toISO = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const isSameDay = (a, b) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const buildGrid = (viewYear, viewMonth) => {
  const firstOfMonth = new Date(viewYear, viewMonth, 1)
  const gridStart = new Date(viewYear, viewMonth, 1 - firstOfMonth.getDay())
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    return { date, inMonth: date.getMonth() === viewMonth }
  })
}

const DatePicker = ({ value, onChange, placeholder = "Choose a date" }) => {
  const selected = parseISO(value)
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(selected || today)
  const wrapRef = useRef(null)

  useEffect(() => {
    setView(selected || new Date())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const grid = buildGrid(view.getFullYear(), view.getMonth())
  const monthLabel = view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const changeMonth = (delta) => setView(v => new Date(v.getFullYear(), v.getMonth() + delta, 1))

  const pick = (date) => {
    onChange(toISO(date))
    setOpen(false)
  }

  return (
    <div className={`datepicker ${open ? "open" : ""}`} ref={wrapRef}>
      <button type="button" className="dp-trigger" onClick={() => setOpen(o => !o)}>
        <i className="bi bi-calendar3"></i>
        <span className={value ? "dp-value" : "dp-placeholder"}>
          {selected ? selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : placeholder}
        </span>
        <i className="bi bi-chevron-down dp-chevron"></i>
      </button>

      {open &&
        <div className="dp-pop" role="dialog" aria-label="Choose a date">
          <div className="dp-head">
            <button type="button" className="dp-nav" onClick={() => changeMonth(-1)} aria-label="Previous month">
              <i className="bi bi-chevron-left"></i>
            </button>
            <span className="dp-month">{monthLabel}</span>
            <button type="button" className="dp-nav" onClick={() => changeMonth(1)} aria-label="Next month">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          <div className="dp-weekdays">
            {WEEKDAYS.map(w => <span key={w}>{w}</span>)}
          </div>

          <div className="dp-grid">
            {grid.map(({ date, inMonth }) => {
              const isSelected = isSameDay(date, selected)
              const isToday = isSameDay(date, today)
              return (
                <button
                  type="button"
                  key={toISO(date)}
                  className={`dp-day ${inMonth ? "" : "dp-muted"} ${isSelected ? "dp-selected" : ""} ${isToday ? "dp-today" : ""}`}
                  onClick={() => pick(date)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="dp-foot">
            <button type="button" className="dp-today-btn" onClick={() => pick(today)}>
              <i className="bi bi-record-circle"></i> Today
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default DatePicker
