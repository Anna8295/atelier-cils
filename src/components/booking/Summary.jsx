import HubIcon from '../HubIcon.jsx'
import { fmtTime, fromISO } from '../../lib/availability.js'

// Left column: the appointment as it builds up, with "Change" links.
export default function Summary({ svc, date, time, locale, b, goTo, locked }) {
  const dateLabel = date ? fromISO(date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' }) : null

  return (
    <aside className="bk-aside" aria-label={b.summary}>
      <div className="bk-photo">
        {svc?.img ? <img key={svc.id} src={svc.img} alt="" /> : <HubIcon id="style" />}
      </div>
      <div className="bk-sumlist">
        <span className="bk-k">{b.summary}</span>
        {svc ? (
          <>
            <div className="bk-line big">
              <span>{svc.name}</span>
              {!locked && <button type="button" className="bk-change" onClick={() => goTo('service')}>{b.change}</button>}
            </div>
            <div className="bk-line"><span>{svc.minutes} min · CHF {svc.price}</span></div>
            {dateLabel && (
              <div className="bk-line">
                <span>{dateLabel}{time != null ? ` · ${fmtTime(time)}` : ''}</span>
                {!locked && <button type="button" className="bk-change" onClick={() => goTo('date')}>{b.change}</button>}
              </div>
            )}
          </>
        ) : (
          <div className="bk-line muted"><span>{b.nothing}</span></div>
        )}
      </div>
    </aside>
  )
}
