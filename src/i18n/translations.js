// All site copy lives here so it can be translated.
// To add a language: copy the `en` object, translate the values,
// and register it under its own key (`fr`, `de`).
// Lists (services, styles, steps…) are matched by `id` with the
// non-language data in src/lib/data.js (prices, durations, images).

// order of the FR / DE / EN switch in the nav
export const LANGS = ['fr', 'de', 'en']

export const translations = {
  en: {
    nav: {
      services: 'Services',
      guide: 'Which lashes?',
      gallery: 'Gallery',
      about: 'About',
      firstVisit: 'First visit',
      faq: 'FAQ',
      book: 'Book now',
      langSoon: (code) => `The ${code} version is coming in the next round.`,
    },

    hero: {
      titleA: 'Lashes, made ',
      titleEm: 'by hand',
      titleB: ' in Lausanne.',
      sub: 'Classic, hybrid and volume extensions, lash lifts and brow lamination. One artist, one chair, 120 minutes of quiet.',
      book: 'Book now',
      prices: 'See prices',
      replay: '↻ Watch again',
      play: '▶ Play the video',
      videoLabel: 'Video: natural lashes, a slow blink, then the same eyes with full volume extensions',
      badge: 'Book now · Réserver · Buchen ·',
      scroll: 'Scroll',
    },

    marquee: ['Classic', 'Hybrid', 'Volume', 'Mega volume', 'Lash lift', 'Brow lamination', 'Refills'],

    services: {
      eyebrow: 'Services & prices',
      titleA: 'Pick your set. ',
      titleEm: 'Prices included.',
      lede: 'Every full set includes a consultation, a lash map drawn for your eye shape, and a free check-up within 72 hours if anything feels off.',
      book: 'Book this',
      min: 'MIN',
      items: {
        classic: { kicker: 'Extensions', name: 'Classic', desc: 'One extension on each natural lash. Looks like mascara, without the mascara.' },
        hybrid: { kicker: 'Most booked', name: 'Hybrid', desc: 'Classic lashes mixed with light fans. Textured and fuller, still soft.' },
        volume: { kicker: 'Extensions', name: 'Volume', desc: 'Handmade fans of 3 to 6 ultra-fine lashes. Dense, dark and fluffy.' },
        mega: { kicker: 'Extensions', name: 'Mega volume', desc: 'The fullest set we offer. For a bold, editorial lash line.' },
        lift: { kicker: 'Natural lashes', name: 'Lash lift', desc: 'Lifts and curls your own lashes from the root, with a tint. No extensions, no refills.' },
        brows: { kicker: 'Brows', name: 'Brow lamination', desc: 'Brushed-up, fuller brows that stay in place. Shaping and tint included.' },
      },
      refillsLabel: 'Refills',
      refillsFor: '(for sets done here):',
      refill2: '2 weeks',
      refill3: '3 weeks',
      refillNew: 'After 4 weeks, a new full set is needed.',
    },

    guide: {
      eyebrow: 'Style guide',
      titleA: 'Which lashes ',
      titleEm: 'suit me?',
      lede: "Tap a style to compare it on the same eye, or answer three questions and we'll suggest one.",
      tabsLabel: 'Lash styles',
      readout: { per: 'Per lash', curl: 'Curl', thk: 'Thickness', look: 'Looks' },
      styles: {
        natural: { tab: 'Your lashes', alt: 'Eye with natural lashes, no treatment', look: 'Bare', desc: 'Your natural lashes before any treatment. Usually 6–8 mm, fairly straight and thin at the tips.' },
        classic: { tab: 'Classic', alt: 'Same eye with classic lash extensions', look: 'Natural+', desc: 'One extension per natural lash. Defined and neat, like a good coat of mascara.' },
        hybrid: { tab: 'Hybrid', alt: 'Same eye with hybrid lash extensions', look: 'Textured', desc: 'Classic lashes mixed with small fans. Fuller than classic with a soft, wispy texture.' },
        volume: { tab: 'Volume', alt: 'Same eye with volume lash extensions', look: 'Fluffy', desc: 'Fans of 3 to 6 very fine lashes on each natural lash. Dark, full lash line without heaviness.' },
        mega: { tab: 'Mega', alt: 'Same eye with mega volume lash extensions', look: 'Dramatic', desc: 'The densest fans we make. A bold, inky lash line that reads from across the room.' },
        lift: { tab: 'Lash lift', alt: 'Same eye after a lash lift and tint', look: 'Fresh', desc: 'Your own lashes, lifted from the root and tinted. No extensions, nothing to refill. Lasts 6–8 weeks.' },
      },
      quiz: {
        title: '3-question quiz',
        lede: 'Takes 20 seconds. You can change your mind at the appointment.',
        questions: [
          { id: 'look', q: 'What look do you want?', a: ['Barely there', 'Noticeable', 'Full glam'] },
          { id: 'nat', q: 'Your natural lashes are…', a: ['Fine or sparse', 'Average', 'Long and strong'] },
          { id: 'masc', q: 'Do you wear mascara now?', a: ['Never', 'Sometimes', 'Every day'] },
        ],
        resultEyebrow: 'Our suggestion',
        empty: 'Answer all three',
        emptyWhy: 'Your result appears here and the photo on the left updates to show it.',
        book: (name) => `Book ${name}`,
        why: {
          lift: 'Your own lashes are already a good base. A lift gives curl and definition with no upkeep.',
          classic: 'You want definition without looking “done”. Classic is the most natural extension set.',
          hybrid: 'You want something noticeable that still looks soft. Hybrid is our most booked set.',
          volume: 'You like a full, dark lash line. Volume gives density using very light fans.',
          mega: 'You want maximum impact. Mega volume is the boldest look we create.',
        },
      },
    },

    gallery: {
      eyebrow: 'Before & after',
      titleA: 'Drag to see ',
      titleEm: 'the difference.',
      filters: { all: 'All', classic: 'Classic', hybrid: 'Hybrid', volume: 'Volume', lift: 'Lash lift' },
      before: 'Before',
      after: 'After',
      compare: (name) => `Compare before and after: ${name}`,
      sample: 'AI sample images. Replace with real client photos before going live.',
      instagram: 'More on Instagram ↗',
    },

    about: {
      eyebrow: 'About the artist',
      portrait: 'Portrait photo goes here',
      story: "I'm Léa. I've spent seven years learning how to place a lash 1 mm from the lid without you feeling a thing. I work alone, I work slowly, and I only use glue I'd put on my own eyes.",
      facts: [
        { n: '7', label: 'years doing lashes full time' },
        { n: '3 800+', label: 'sets and refills done' },
        { n: '1', label: 'client in the room at a time' },
      ],
      certs: [
        ['Certified volume lash artist', 'Lash Academy Genève · 2019'],
        ['Mega volume masterclass', 'Milano · 2022'],
        ['Lash lift & brow lamination', '2021'],
        ['Sensitive-eye adhesive, latex and formaldehyde free', 'patch test on request'],
        ['Single-use brushes, sterilised tweezers', 'every client'],
      ],
    },

    reviews: {
      eyebrow: 'Reviews',
      titleA: 'What clients ',
      titleEm: 'say.',
      items: [
        ['First time ever and I fell asleep. Woke up with the softest hybrid set. Already booked my refill.', 'Camille R.'],
        ["My eyes are very sensitive and I've reacted to glue before. Léa did a patch test first and I had zero redness.", 'Sarah M.'],
        ['Volume set lasted almost four weeks with the aftercare tips. Best in Lausanne for me.', 'Inès B.'],
        ['The lash lift made my straight lashes curl for the first time in my life. No mascara for two months.', 'Julia K.'],
        ['Calm room, on time, explains everything. I booked my wedding lashes here and they looked perfect in every photo.', 'Noémie T.'],
        ['Booking through the app took one minute and I got a reminder the day before. Very easy.', 'Lara F.'],
      ],
      rating: '★ on Google · 212 reviews',
      sample: 'Sample reviews. The live site pulls these from Google.',
    },

    visit: {
      eyebrow: 'Your first visit',
      titleA: 'What happens, ',
      titleEm: 'step by step.',
      lede: 'Knowing what to expect makes it easier to relax, and a relaxed eye is easier to work on.',
      steps: [
        { num: 'Step 1 · 48 h before', title: 'Patch test', text: "If it's your first set or you have sensitive eyes, come in for a 5-minute patch test. We check for any reaction 48 hours later.", time: 'Free · 5 min' },
        { num: 'Step 2 · on the day', title: 'Come ready', list: ['No mascara or eye makeup', 'Remove contact lenses', 'Skip the extra coffee, it makes eyes twitch', 'Wash your face, no oil-based cleanser'], time: 'Arrive 5 min early' },
        { num: 'Step 3 · 15 min', title: 'Consultation', text: 'We look at your eye shape and your natural lashes, then draw a lash map: curl, lengths and where the longest lashes go.', time: 'Included' },
        { num: 'Step 4 · 90–150 min', title: 'Application', text: 'You lie down with your eyes closed under a soft lamp. Lower lashes are covered with a gel pad. Most clients nap.', time: 'Blanket and music included' },
        { num: 'Step 5 · last 5 min', title: 'Check & aftercare', text: 'Mirror check, a cleansing brush to take home, and your refill date booked before you leave.', time: 'Refill in 2–3 weeks' },
      ],
    },

    aftercare: {
      eyebrow: 'Aftercare',
      titleA: 'Make them ',
      titleEm: 'last longer.',
      timeline: [
        ['0–24 h', 'Keep them dry', 'No water, steam, sauna or swimming while the glue fully cures.'],
        ['Daily', 'Clean and brush', 'Wash with lash foam and a soft brush, pat dry, then brush through with the spoolie.'],
        ['Always', 'Avoid oils', 'Oil-based makeup removers and creams near the eyes break down the bond.'],
        ['Night', 'Sleep on your back', 'Or use a silk pillowcase. Rubbing your face into the pillow bends lashes.'],
        ['2–3 wk', 'Book your refill', 'You naturally shed 2 to 5 lashes a day. A refill fills the gaps before the set looks sparse.'],
      ],
      calcTitle: 'When is my refill due?',
      calcLabel: 'Date of your last set or refill',
      meter: ['Fresh', '2 wk', '3 wk', 'New set'],
      book: 'Book my refill',
      empty: 'Pick a date to see your refill window.',
      future: ['That date is in the future.', 'Pick the day of your last appointment.'],
      early: (a, b, days) => [`Refill between ${a} and ${b}.`, `Day ${days} of your set. You have ${14 - days} days before the ideal window opens.`],
      due: (b, days) => ['Your refill is due now.', `Day ${days}. Book before ${b} to keep the refill price.`],
      soon: (days) => [`Book soon, it's day ${days}.`, 'A 3-week refill is still possible if at least 40% of the set is left.'],
      newSet: (days) => ['Time for a new full set.', `It's been ${days} days, so most extensions will have shed naturally.`],
    },

    faq: {
      eyebrow: 'FAQ',
      titleA: 'Questions ',
      titleEm: 'we get',
      titleB: ' every day.',
      lede: 'Still unsure? Send a WhatsApp message and Léa replies the same day.',
      items: [
        ['Does it hurt?', 'No. Extensions are glued to your natural lash about 1 mm from the skin, never to the eyelid. You keep your eyes closed the whole time. Most people fall asleep.'],
        ['How long do extensions last?', 'They fall out with your natural lashes over 4 to 6 weeks. With refills every 2 to 3 weeks you can keep a full set as long as you like.'],
        ['Will they damage my natural lashes?', "Not when they're applied correctly. We match the weight of each extension to the strength of your natural lash and never glue lashes together."],
        ["What if I'm allergic?", 'We use a sensitive-eye adhesive. If you have reacted to glue before, or have very sensitive eyes, book a free patch test 48 hours ahead.'],
        ['Can I wear makeup?', 'Yes, except mascara on the extensions. Use oil-free products around the eyes and a water-based remover.'],
        ['Can I have extensions while pregnant?', 'Many clients do. Hormones can make retention less predictable, so a lash lift or a lighter classic set is often a better choice.'],
      ],
    },

    booking: {
      eyebrow: 'Booking',
      titleA: 'Book your ',
      titleEm: 'chair.',
      intro: "Choose a time below or open the full calendar. You'll get a confirmation and a reminder 24 hours before.",
      introFor: (s) => `Booking: ${s}. Pick a time below or open the full calendar. You'll get a confirmation and a reminder 24 hours before.`,
      widget: 'Next free slots · preview of the Fresha widget',
      slotPicked: (s) => `${s} selected. On the live site this opens Fresha to confirm.`,
      calendar: 'Open full calendar ↗',
      policies: [
        ['Deposit', 'CHF 30 to secure a full set. It comes off the final price.'],
        ['Cancelling', 'Free up to 24 hours before. Later cancellations and no-shows keep the deposit.'],
        ['Late', 'More than 15 minutes late and we may need to switch you to a refill or rebook.'],
        ['Refills', "Need at least 40% of your set left. Otherwise it's booked as a new set."],
        ['Payment', 'Paid at the end of your visit.'],
      ],
    },

    voucher: {
      eyebrow: 'Gift vouchers',
      titleA: 'Give someone ',
      titleEm: 'a full set.',
      card: 'Gift voucher',
      for: 'For',
      someone: 'someone lovely',
      valid: 'valid 12 months',
      amounts: { 95: 'lash lift', 150: 'hybrid', 200: 'mega' },
      who: 'Who is it for?',
      placeholder: 'Their first name',
      submit: 'Request voucher',
      done: (a) => `Request ready for a CHF ${a} voucher. On the live site this goes to checkout with TWINT or card.`,
    },

    contact: {
      eyebrow: 'Location & contact',
      titleA: 'Find ',
      titleEm: 'the studio.',
      pin: 'Atelier Cils · 2nd floor',
      lake: 'LAC LÉMAN',
      street: 'Rue de Bourg 12',
      city: '1003 Lausanne · buzzer “Cils”, 2nd floor',
      metro: ['Metro', 'M2 to Lausanne-Flon or Bessières, 4 min walk'],
      parking: ['Parking', 'Parking Riponne-Maurice Béjart, 6 min walk'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      closed: 'Closed',
      copy: 'Copy',
      copied: 'Number copied',
      selected: 'Number selected, press copy',
      directions: 'Directions ↗',
    },

    footer: {
      rights: '© 2026 Atelier Cils · Léa Morand · Lausanne',
      imprint: 'Impressum',
      privacy: 'Privacy policy',
      vouchers: 'Gift vouchers',
      contact: 'Contact',
    },
  },
}
