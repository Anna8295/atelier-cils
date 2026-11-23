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
      prices: 'Prices',
      results: 'Styles',
      guide: 'Which lashes?',
      visit: 'Your visit',
      about: 'About',
      book: 'Book now',
      langSoon: (code) => `The ${code} version is coming in the next round.`,
    },

    hero: {
      titleA: 'Lashes, made ',
      titleEm: 'by hand',
      titleB: ' in Lausanne.',
      book: 'Book now',
      prices: 'See prices',
      videoLabel: 'Video: natural lashes, a slow blink, then the same eyes with full volume extensions',
      badge: 'Book now · Réserver · Buchen ·',
      scroll: 'Scroll',
    },

    marquee: ['Classic', 'Hybrid', 'Volume', 'Mega volume', 'Lash lift', 'Brow lamination', 'Refills'],

    services: {
      titleA: 'Pick your set. ',
      titleEm: 'Prices included.',
      lede: 'Every full set starts with a short consultation and a lash map drawn for your eye shape.',
      book: 'Book',
      bookName: (name) => `Book ${name}`,
      popular: 'Most booked',
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
      quizLink: 'Not sure which set? Take the 20-second quiz →',
    },

    // home: the cards that open the detail pages
    hub: {
      titleA: 'Everything else, ',
      titleEm: 'one tap away.',
      items: {
        style: { meta: 'Quiz · 20 sec', title: 'Which lashes suit me?', text: 'Compare every style on the same eye, or answer three questions and get a suggestion.' },
        visit: { meta: '5 steps', title: 'Your first visit', text: 'Patch test, how to prepare, and what happens while you lie back in the chair.' },
        aftercare: { meta: 'Refill calculator', title: 'Aftercare & refills', text: 'Keep your set full for longer, and see exactly when your refill is due.' },
        faq: { meta: '6 answers', title: 'Questions', text: 'Does it hurt? What about allergies, makeup or pregnancy?' },
        about: { meta: '7 years · 3 800+ sets', title: 'About Léa', text: 'Certifications, the sensitive-eye glue she uses, and why she works alone.' },
        gift: { meta: 'From CHF 95', title: 'Gift vouchers', text: 'Give a lash lift, a hybrid set or mega volume, with a personal message.' },
      },
    },

    // detail pages
    page: {
      back: '← Back to home',
      titles: {
        style: 'Which lashes suit me? · Atelier Cils',
        visit: 'Your first visit · Atelier Cils',
        aftercare: 'Aftercare & refills · Atelier Cils',
        about: 'About Léa · Atelier Cils',
        gift: 'Gift vouchers · Atelier Cils',
      },
      bandA: 'Ready when ',
      bandEm: 'you are.',
      bandText: 'Pick a set and a time. Booking takes about a minute.',
      bandPrices: 'See prices',
    },

    guide: {
      titleA: 'Which lashes ',
      titleEm: 'suit me?',
      lede: "Tap a style to compare it on the same eye, or answer three questions and we'll suggest one.",
      tabsLabel: 'Lash styles',
      hold: 'Hold to compare',
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
      // illustrations of each style on the same eye, not client results
      titleA: 'Every style, ',
      titleEm: 'side by side.',
      filters: { all: 'All', classic: 'Classic', hybrid: 'Hybrid', volume: 'Volume', lift: 'Lash lift' },
      natural: 'Natural',
      alt: (name) => `Illustration of ${name} lashes on the same eye`,
      naturalAlt: 'Illustration of natural lashes',
      compare: (name) => `Compare natural lashes with ${name}`,
      instagram: 'More on Instagram ↗',
    },

    about: {
      titleA: 'Meet ',
      titleEm: 'Léa.',
      caption: (owner) => `${owner} · lash artist`,
      story: "I'm Léa. I've spent seven years learning how to place a lash 1 mm from the lid, gently and precisely. I work alone, I work slowly, and I only use glue I'd put on my own eyes.",
      facts: [
        { n: '7', label: 'years doing lashes full time' },
        { n: '3 800+', label: 'sets and refills done' },
        { n: '1', label: 'client in the room at a time' },
      ],
      groups: [
        {
          icon: 'award',
          title: 'Training',
          items: [
            ['Certified volume lash artist', 'Lash Academy Genève · 2019'],
            ['Lash lift & brow lamination', '2021'],
            ['Mega volume masterclass', 'Milano · 2022'],
          ],
        },
        {
          icon: 'shield',
          title: 'Products & hygiene',
          items: [
            ['Adhesive made for sensitive eyes', 'every set'],
            ['Free patch test before a first set', 'on request'],
            ['Single-use brushes, sterilised tweezers', 'every client'],
          ],
        },
      ],
    },


    visit: {
      titleA: 'What happens, ',
      titleEm: 'step by step.',
      lede: 'Knowing what to expect makes it easier to relax, and a relaxed eye is easier to work on.',
      steps: [
        { num: '48 h before', title: 'Patch test', text: "If it's your first set or you have sensitive eyes, come in for a 5-minute patch test. We check for any reaction 48 hours later.", time: 'Free · 5 min' },
        { num: 'On the day', title: 'Come ready', list: ['No mascara or eye makeup', 'Remove contact lenses', 'Skip the extra coffee, it makes eyes twitch', 'Wash your face, no oil-based cleanser'], time: 'Arrive 5 min early' },
        { num: '15 min', title: 'Consultation', text: 'We look at your eye shape and your natural lashes, then draw a lash map: curl, lengths and where the longest lashes go.', time: 'Included' },
        { num: '90–150 min', title: 'Application', text: 'You lie down with your eyes closed under a soft lamp. Lower lashes are covered with a gel pad. Most clients nap.', time: 'Blanket and music included' },
        { num: 'Last 5 min', title: 'Check & aftercare', text: 'Mirror check, a cleansing brush to take home, and your refill date booked before you leave.', time: 'Refill in 2–3 weeks' },
      ],
    },

    aftercare: {
      titleA: 'Make them ',
      titleEm: 'last longer.',
      lede: 'Five small habits help your set stay full for longer.',
      timeline: [
        ['0–24 h', 'Keep them dry', 'No water, steam, sauna or swimming while the glue fully cures.'],
        ['Daily', 'Clean and brush', 'Wash with lash foam and a soft brush, pat dry, then brush through with the spoolie.'],
        ['Always', 'Avoid oils', 'Oil-based makeup removers and creams near the eyes break down the bond.'],
        ['Night', 'Sleep on your back', 'Or use a silk pillowcase. Rubbing your face into the pillow bends lashes.'],
        ['2–3 wk', 'Book your refill', 'You naturally shed 2 to 5 lashes a day. A refill fills the gaps before the set looks sparse.'],
      ],
      calcTitle: 'When is my refill due?',
      calcLabel: 'Date of your last set or refill',
      zones: { fresh: 'Fresh', window: 'Refill window', newSet: 'New set', today: 'Today' },
      book: 'Book my refill',
      remind: 'Add a reminder',
      remindTitle: 'Book your lash refill · Atelier Cils',
      empty: 'Pick a date to see your refill window.',
      future: ['That date is in the future.', 'Pick the day of your last appointment.'],
      early: (a, b, days) => [`Refill between ${a} and ${b}.`, `Day ${days} of your set. You have ${14 - days} days before the ideal window opens.`],
      due: (b, days) => ['Your refill is due now.', `Day ${days}. Book before ${b} to keep the refill price.`],
      soon: (days) => [`Book soon, it's day ${days}.`, 'A 3-week refill is still possible if at least 40% of the set is left.'],
      newSet: (days) => ['Time for a new full set.', `It's been ${days} days, so most extensions will have shed naturally.`],
    },

    faq: {
      titleA: 'Questions ',
      titleEm: 'we get',
      titleB: ' every day.',
      lede: 'Still unsure? Send a WhatsApp message and Léa replies the same day.',
      ask: 'Ask on WhatsApp ↗',
      items: [
        ['Does it hurt?', "It shouldn't. Extensions are attached to your natural lash about 1 mm from the skin, never to the eyelid, and you keep your eyes closed the whole time. If anything stings or feels uncomfortable, say so and Léa stops."],
        ['How long do extensions last?', 'They fall out with your natural lashes over 4 to 6 weeks. With refills every 2 to 3 weeks you can keep a full set as long as you like.'],
        ['Will they damage my natural lashes?', "Applied correctly, they shouldn't. Léa matches the weight of each extension to your natural lash and never glues lashes together. Rubbing, pulling or removing extensions yourself can damage natural lashes."],
        ["What if I'm allergic?", 'Léa uses an adhesive made for sensitive eyes, but no adhesive suits everyone. If you have reacted to lash glue before, or have very sensitive eyes, book a patch test 48 hours ahead.'],
        ['Can I wear makeup?', 'Yes, except mascara on the extensions. Use oil-free products around the eyes and a water-based remover.'],
        ['Can I have extensions while pregnant?', 'Please check with your doctor or midwife first. Hormone changes can make extensions shed faster and lifts less predictable, so mention it when you book.'],
      ],
    },

    booking: {
      titleA: 'Book your ',
      titleEm: 'chair.',
      steps: { service: 'Service', date: 'Date & time', details: 'Your details' },
      refill2: 'Refill · 2 weeks',
      refill3: 'Refill · 3 weeks',
      chooseService: 'What would you like?',
      pickDay: 'Pick a day',
      pickTime: 'Pick a time',
      noDay: 'Pick a day to see the free times.',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      status: { closed: 'Closed', full: 'Fully booked', few: 'A few times left', open: 'Free times', past: '', out: '' },
      legendFew: 'A few times left',
      parts: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' },
      continue: 'Continue',
      back: '← Back',
      change: 'Change',
      summary: 'Your appointment',
      nothing: 'Nothing chosen yet',
      form: {
        name: 'Full name',
        phone: 'Phone',
        phoneHint: 'So Léa can reach you if something changes.',
        email: 'Email',
        first: 'This is my first visit (Léa will offer a patch test)',
        notes: 'Anything Léa should know?',
        notesHint: 'Please don\'t write health details here. Léa asks about allergies in person.',
        remind: 'Email me when my refill is due',
        purpose: 'We use your details only to arrange this appointment.',
        privacy: 'Privacy policy',
        optional: 'optional',
        required: 'Please fill this in.',
        badEmail: 'Please check the email address.',
        badPhone: 'Please check the phone number.',
      },
      confirm: 'Confirm booking',
      done: {
        title: "You're booked.",
        text: (email) => `A confirmation is on its way to ${email}. You'll get a reminder with the preparation tips 24 hours before.`,
        ics: 'Add to calendar',
        again: 'Book something else',
        icsTitle: (s) => `${s} · Atelier Cils`,
      },
      policySummary: 'Deposit, cancellation and payment rules',
      policyToggle: 'Booking policy',
      policies: (T) => {
        const s = (x) => x[0].toUpperCase() + x.slice(1) + '.'
        return [
          ['Confirmation', s(T.confirmation)],
          ['Deposit', s(T.deposit)],
          ['Cancelling', `Free up to ${T.cancelNotice} before. ${s(T.lateCancel)}`],
          ['Late', s(T.late)],
          ['Refills', s(T.refill)],
          ['Payment', s(T.payment)],
        ]
      },
      terms: 'Full booking terms',
    },

    voucher: {
      titleA: 'Give someone ',
      titleEm: 'a full set.',
      lede: 'A voucher for any treatment at the studio.',
      card: 'Gift voucher',
      for: 'For',
      from: 'From',
      someone: 'someone lovely',
      valid: (validity) => `Valid ${validity}`,
      amounts: { 95: 'Lash lift', 150: 'Hybrid set', 200: 'Mega volume' },
      chooseAmount: 'Choose an amount',
      to: 'Who is it for?',
      toPlaceholder: 'Their first name',
      fromLabel: 'From',
      fromPlaceholder: 'Your name',
      message: 'A short message',
      messagePlaceholder: 'Happy birthday, treat yourself!',
      optional: 'optional',
      email: 'Your email',
      submit: 'Request voucher',
      purpose: 'We use your email only to send the payment link and the voucher.',
      privacy: 'Privacy policy',
      required: 'Please fill this in.',
      badEmail: 'Please check the email address.',
      doneTitle: 'Voucher requested.',
      doneText: (amount, to, email) => `Léa will email a payment link to ${email}. Your CHF ${amount} voucher for ${to} follows right after, ready to print or forward.`,
      again: 'Make another voucher',
      howTitle: 'How it works',
      how: [
        ['gift', 'Choose', 'Pick an amount and add a personal message.'],
        ['pay', 'Pay', 'You get a secure payment link by email.'],
        ['mail', 'Receive', 'The voucher arrives by email, ready to print or forward.'],
      ],
    },

    // footer: studio, hours, contact
    contact: {
      studio: 'Studio',
      hours: 'Opening hours',
      contact: 'Contact',
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      closed: 'Closed',
      hoursShort: (open, closed) => `Open ${open} · closed ${closed}`,
      today: 'today',
      tomorrow: 'tomorrow',
      openNow: (until) => `Open now · until ${until}`,
      closedNow: (day, at) => `Closed · opens ${day} ${at}`,
      copy: 'Copy',
      copied: 'Number copied',
      selected: 'Number selected, press copy',
      directions: 'Directions ↗',
    },

    footer: {
      rights: (year, b) => `© ${year} ${b.tradeName} · Concept site, fictional studio`,
      imprint: 'Imprint',
      privacy: 'Privacy policy',
      terms: 'Terms',
      vouchers: 'Gift vouchers',
      faq: 'FAQ',
    },
  },
}
