import { fmtTime } from '../../lib/availability.js'

const PARTS = [
  ['morning', 0, 12 * 60],
  ['afternoon', 12 * 60, 17 * 60],
  ['evening', 17 * 60, 24 * 60],
]

// Free start times for the chosen day, grouped into morning / afternoon / evening.
export default function TimeSlots({ slots, selected, onSelect, b }) {
  return (
    <div className="slots-wrap">
      {PARTS.map(([key, from, to]) => {
        const group = slots.filter((s) => s >= from && s < to)
        if (!group.length) return null
        return (
          <div className="slot-group" key={key}>
            <span className="slot-part">{b.parts[key]}</span>
            <div className="slot-list">
              {group.map((s) => (
                <button key={s} type="button" className="chip mono-chip" aria-pressed={selected === s} onClick={() => onSelect(s)}>
                  {fmtTime(s)}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
