import { useLang } from '../../i18n/LanguageContext.jsx'
import { SERVICES, REFILLS, STYLE_BY_ID } from '../../lib/data.js'

// Everything a client can book, with its translated name.
// Ids match SERVICES / REFILLS, and BookingContext stores the id.
export default function useBookable() {
  const { t } = useLang()
  return [
    ...SERVICES.map((s) => ({
      id: s.id,
      name: t.services.items[s.id].name,
      minutes: s.minutes,
      price: s.price,
      img: STYLE_BY_ID[s.id]?.img ?? null,
    })),
    ...REFILLS.map((r) => ({
      id: r.id,
      name: t.booking[r.id],
      minutes: r.minutes,
      price: r.price,
      img: null,
    })),
  ]
}
