// Legal pages: privacy policy (with cookies), terms, imprint.
//
// Every statement here is based on what the site's code actually does.
// [BRACKETED] values are placeholders from BUSINESS / TERMS / PRIVACY in
// src/lib/data.js. Lines marked NEEDS REVIEW are legally uncertain and
// should be checked by the owner or a lawyer before going live.
//
// Draft for Switzerland (revised Federal Act on Data Protection, nFADP).
// NEEDS REVIEW: whether the GDPR also applies (only if the studio actively
// offers its services to people in the EU, e.g. clients from France).

import { BUSINESS, PRIVACY, TERMS } from '../lib/data.js'

const B = BUSINESS
const contactLine = `${B.legalName}, ${B.owner}, ${B.street}, ${B.city}, ${B.email}`

export const legal = {
  privacy: {
    title: 'Privacy policy',
    updated: `Last updated: ${PRIVACY.lastUpdated}`,
    sections: [
      {
        h: 'Who is responsible',
        body: [`The controller for this website is ${contactLine}. For any privacy question or request, write to ${B.email}.`],
      },
      {
        h: 'Summary',
        body: [{
          list: [
            'This website sets no cookies and uses no analytics, advertising or tracking tools.',
            'Fonts, images and videos are served from this website, not from Google or other third parties.',
            'We only receive personal data when you send a booking or gift voucher request, and we use it only for that request.',
          ],
        }],
      },
      {
        h: 'When you visit the website',
        body: [
          // NEEDS REVIEW: the site is not deployed yet; confirm the host and what it logs.
          `The website is hosted by ${PRIVACY.hosting}. Like most hosts, it records technical data for every visit (IP address, date and time, page requested, browser and operating system) to deliver the site and keep it secure. These logs are kept for ${PRIVACY.logRetention}.`,
          'Some tools work only inside your browser and never send anything to us: the lash style quiz, the refill date calculator, and the "Add to calendar" and "Add a reminder" files, which are created on your device.',
        ],
      },
      {
        h: 'Booking requests',
        body: [
          'When you book, we collect: the service, date and time you chose, your name, your email address, your phone number (optional), whether it is your first visit, and an optional note.',
          'We use this to arrange and manage your appointment, send the confirmation and, if it is your first visit, offer a patch test. The legal basis is the contract you ask us to enter into.',
          'Please do not write health details in the note. If a treatment needs health information (for example allergies or eye conditions), Léa asks about it in person before the patch test or treatment.',
          // NEEDS REVIEW: allergy/health answers are sensitive personal data under the nFADP.
          `Consultation and patch-test notes: ${PRIVACY.consultationNotes}.`,
          `Booking data is kept for ${PRIVACY.bookingRetention}.`,
        ],
      },
      {
        h: 'Refill reminders (optional)',
        body: [
          'If you tick the box "Email me when my refill is due", we use your email address to send you one reminder per appointment. This is optional and only happens with your consent. You can withdraw it at any time by replying to the reminder or writing to us.',
        ],
      },
      {
        h: 'Gift voucher requests',
        body: [
          "When you request a gift voucher, we collect: the amount, the recipient's first name, your name (optional), a short message (optional) and your email address. We use them to send you the payment link and the voucher.",
          // NEEDS REVIEW: Swiss commercial law may require keeping accounting records for 10 years.
          `Voucher records are kept for ${PRIVACY.voucherRetention}.`,
        ],
      },
      {
        h: 'Service providers and transfers abroad',
        body: [
          // NEEDS REVIEW: no backend exists yet; list the real providers once chosen.
          `Booking and voucher requests are processed and emailed using ${PRIVACY.processor}. Our hosting provider is ${PRIVACY.hosting}.`,
          'If a provider stores data outside Switzerland or the EU/EEA in a country without adequate data protection, we use recognised safeguards such as the EU Standard Contractual Clauses.',
        ],
      },
      {
        h: 'Links to other services',
        body: [
          'The site links to WhatsApp, Instagram and Google Maps. Nothing is sent to these services when you visit our site. They only receive data if you click a link and open them, and then their own privacy policies apply (WhatsApp and Instagram: Meta; Google Maps: Google). These companies may process data in the USA.',
        ],
      },
      {
        h: 'Cookies and similar technologies',
        body: [
          'This website does not set cookies and does not use local storage, tracking pixels or fingerprinting. That is why there is no cookie banner. If this ever changes, we will update this policy and ask for your consent before any non-essential cookie is set.',
        ],
      },
      {
        h: 'Your rights',
        body: [
          'You can ask what data we hold about you, have it corrected or deleted, object to its use, receive a copy in a common format, and withdraw any consent you gave. Write to ' + B.email + '. We may ask you to confirm your identity.',
          // NEEDS REVIEW: add the EU authority wording only if the GDPR applies.
          'You can also complain to the Swiss Federal Data Protection and Information Commissioner (FDPIC, edoeb.admin.ch). If you live in the EU, you can contact the data protection authority in your country.',
        ],
      },
      {
        h: 'Security',
        body: ['The site is served over an encrypted connection (HTTPS). We limit access to your data to what is needed for your appointment or voucher.'],
      },
      {
        h: 'Changes',
        body: ['We update this policy when the website or our services change. The date at the top shows the latest version.'],
      },
    ],
  },

  terms: {
    title: 'Booking and voucher terms',
    updated: `Last updated: ${PRIVACY.lastUpdated}`,
    sections: [
      { h: 'Who we are', body: [`These terms apply to treatments and gift vouchers from ${B.tradeName} (${B.legalName}, ${B.street}, ${B.city}).`] },
      {
        h: 'Bookings',
        body: [
          `A booking request becomes binding once it is confirmed: ${TERMS.confirmation}.`,
          `Deposit: ${TERMS.deposit}.`,
        ],
      },
      {
        h: 'Cancelling, rescheduling and no-shows',
        body: [`You can cancel or move an appointment free of charge up to ${TERMS.cancelNotice} before it starts. ${TERMS.lateCancel}.`, `Late arrival: ${TERMS.late}.`],
      },
      { h: 'Refills', body: [`${TERMS.refill}.`] },
      {
        h: 'Prices and payment',
        body: [`Prices are shown in Swiss francs (CHF). ${TERMS.vat}. Payment: ${TERMS.payment}.`],
      },
      {
        h: 'Your health and the patch test',
        body: [
          'Before a treatment, please tell us about allergies, eye conditions, recent eye surgery, pregnancy or anything else that could affect it. A patch test is recommended before a first set.',
          'We may decline or stop a treatment if it does not seem safe for you.',
        ],
      },
      {
        h: 'Results and aftercare',
        body: ['How long lashes last depends on your natural lash cycle and on aftercare. We cannot guarantee how long a set will last.'],
      },
      { h: 'Complaints', body: [`If you are not happy with a treatment, contact us at ${B.email}. ${TERMS.complaints}.`] },
      {
        h: 'Gift vouchers',
        body: [
          `Vouchers are valid for ${TERMS.voucherValidity} from the date of purchase.`,
          // NEEDS REVIEW: voucher validity, cash refunds and (for EU buyers) a possible 14-day right of withdrawal.
          `${TERMS.voucherRefund}.`,
        ],
      },
      {
        h: 'Liability',
        // NEEDS REVIEW: liability limits for cosmetic treatments.
        body: ['We carry out every treatment with care. Liability is governed by Swiss law. Nothing in these terms limits liability for intent or gross negligence.'],
      },
      {
        h: 'Applicable law',
        // NEEDS REVIEW: consumers may keep the right to sue at their place of residence.
        body: [`Swiss law applies. Place of jurisdiction: ${TERMS.jurisdiction}, subject to mandatory consumer protection rules.`],
      },
    ],
  },

  imprint: {
    title: 'Imprint',
    updated: '',
    sections: [
      {
        h: 'Business',
        body: [{ list: [B.legalName, `Owner: ${B.owner}`, `Legal form: ${B.legalForm}`, `${B.street}, ${B.city}`, 'Switzerland'] }],
      },
      { h: 'Contact', body: [{ list: [`Email: ${B.email}`, `Phone: ${B.phone}`] }] },
      { h: 'Business registration', body: [`UID: ${B.uid}`] },
      { h: 'Responsible for content', body: [B.owner] },
      {
        h: 'Liability for links',
        body: ['This site links to external websites. We have no influence on their content and are not responsible for it.'],
      },
    ],
  },
}
