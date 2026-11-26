// Words that point the chat assistant to a topic, in English, French and
// German together (a visitor may type English on the French site).
// They are compared without accents or capitals, at the start of a word:
// "allerg" matches "allergic", "allergique" and "Allergie". Words of three
// letters or fewer must match a whole word, so "hi" doesn't match "hike".
//
// The order matters: when two topics match equally well, the first one wins,
// so the specific topics come first and greetings come last.
export const KEYWORDS = {
  hurt: ['hurt', 'pain', 'sting', 'uncomfortable', 'fait mal', 'ca fait mal', 'douleur', 'douloureu', 'pique', 'tut es weh', 'weh', 'schmerz', 'brennt'],
  pregnant: ['pregnan', 'expecting', 'breastfeed', 'enceinte', 'grossesse', 'allait', 'schwanger', 'stillen', 'stillzeit'],
  allergy: ['allerg', 'reaction', 'react', 'sensitive', 'swollen', 'swelling', 'itch', 'irritat', 'patch', 'sensible', 'gonfl', 'demange', 'empfindlich', 'juck', 'geschwollen', 'reaktion', 'vertrag', 'vertraglich'],
  damage: ['damage', 'ruin', 'harm', 'my own lashes', 'my natural lashes', 'abim', 'endommag', 'cils naturels', 'mes cils', 'schaden', 'schadig', 'kaputt', 'meine wimpern', 'naturwimpern'],
  makeup: ['makeup', 'make up', 'mascara', 'eyeliner', 'remover', 'maquill', 'demaquill', 'schmink', 'abschmink'],
  last: ['last', 'fall out', 'falling out', 'shed', 'tenir', 'tiennent', 'durent', 'tombent', 'tomber', 'halten', 'haltbar', 'ausfallen', 'fallen aus'],
  refill: ['refill', 'fill', 'top up', 'infill', 'remplissage', 'retouche', 'recharge', 'auffull', 'nachfull'],
  aftercare: ['aftercare', 'care for', 'look after', 'clean', 'wash', 'shower', 'swim', 'sauna', 'sleep', 'pillow', 'wet', 'water', 'oil', 'entretien', 'entretenir', 'nettoy', 'laver', 'douche', 'piscine', 'dormir', 'oreiller', 'mouill', 'eau', 'huile', 'pflege', 'pfleg', 'reinig', 'wasch', 'dusch', 'schwimm', 'schlaf', 'kissen', 'nass', 'wasser', 'ol'],
  prepare: ['prepar', 'before my appointment', 'before the appointment', 'first visit', 'first time', 'bring', 'contact lens', 'coffee', 'premiere fois', 'premier rendez', 'avant le rendez', 'avant mon rendez', 'lentille', 'cafe', 'vorbereit', 'erstes mal', 'erste mal', 'ersten termin', 'erster termin', 'kontaktlins', 'kaffee', 'vor dem termin', 'mitbringen'],
  policy: ['deposit', 'cancel', 'late', 'no show', 'payment', 'pay', 'twint', 'card', 'cash', 'refund', 'reschedul', 'acompte', 'annul', 'retard', 'paie', 'payer', 'carte', 'especes', 'rembours', 'anzahlung', 'storn', 'absag', 'verspat', 'zahl', 'bezahl', 'kreditkarte', 'bargeld'],
  voucher: ['voucher', 'gift card', 'carte cadeau', 'gift', 'present', 'birthday', 'bon cadeau', 'cadeau', 'offrir', 'anniversaire', 'gutschein', 'geschenk', 'schenken', 'geburtstag'],
  hours: ['open', 'hours', 'closed', 'when are you', 'saturday', 'sunday', 'monday', 'weekend', 'ouvert', 'horaire', 'ferme', 'samedi', 'dimanche', 'lundi', 'offnungszeit', 'offen', 'geoffnet', 'geschlossen', 'samstag', 'sonntag', 'montag', 'wochenende'],
  location: ['where', 'address', 'located', 'find you', 'metro', 'parking', 'directions', 'ou est', 'ou etes', 'ou se', 'adresse', 'situe', 'vous trouver', 'wo', 'standort', 'anfahrt', 'parkplatz', 'finde ich'],
  contact: ['contact', 'phone', 'call', 'email', 'mail', 'whatsapp', 'instagram', 'reach', 'talk to', 'speak to', 'human', 'real person', 'telephon', 'appeler', 'joindre', 'parler', 'telefon', 'anrufen', 'erreichen', 'kontakt', 'sprechen'],
  price: ['price', 'cost', 'how much', 'expensive', 'cheap', 'chf', 'franc', 'how long does it take', 'take long', 'duration', 'prix', 'tarif', 'combien', 'coute', 'trop cher', 'duree', 'preis', 'kost', 'wie viel', 'wieviel', 'teuer', 'gunstig', 'dauer', 'dauert'],
  quiz: ['which', 'suit', 'recommend', 'best for me', 'choose', 'decide', 'advice', 'difference', 'quel', 'quelle', 'conseil', 'recommand', 'choisir', 'convient', 'difference', 'welche', 'passt', 'empfehl', 'berat', 'unterschied', 'aussuchen'],
  book: ['book', 'appointment', 'reserve', 'availability', 'available', 'slot', 'reserv', 'rendez', 'rdv', 'dispo', 'creneau', 'buchen', 'termin', 'frei'],
  thanks: ['thank', 'thx', 'merci', 'danke'],
  greeting: ['hi', 'hello', 'hey', 'bonjour', 'salut', 'coucou', 'hallo', 'gruezi', 'gruessech', 'hoi', 'servus', 'guten tag'],
}

// Names of each service, so "how much is volume?" answers for volume only.
// Mega comes before volume because "mega volume" contains "volume".
export const SERVICE_WORDS = {
  mega: ['mega'],
  brows: ['brow', 'eyebrow', 'sourcil', 'augenbraue', 'braue', 'lamination'],
  lift: ['lift', 'rehauss', 'wimpernlift'],
  hybrid: ['hybrid'],
  classic: ['classic', 'classique', 'klassisch'],
  volume: ['volume', 'volumen'],
}
