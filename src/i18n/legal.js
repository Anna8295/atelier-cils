// Legal pages: privacy policy (with cookies), terms, imprint, in EN / FR / DE.
//
// Written for a fictional studio (this is a concept site). Every statement
// about data matches what the code does. Names, address and contact come
// from BUSINESS in src/lib/data.js; the translated details (legal form,
// booking rules, privacy facts) come from `biz`, `terms` and `privacyFacts`
// in each language file. If this ever becomes a real business, have the
// texts checked against the nFADP (and the GDPR if EU clients are targeted).

import { BUSINESS } from '../lib/data.js'

const B = BUSINESS
const contactLine = `${B.legalName}, ${B.street}, ${B.city}, ${B.email}`

const en = (T, P, Z) => ({
  privacy: {
    title: 'Privacy policy',
    updated: `Last updated: ${P.lastUpdated}`,
    sections: [
      { h: 'Who is responsible', body: [`The controller for this website is ${contactLine}. For any privacy question or request, write to ${B.email}.`] },
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
          `The website is hosted by ${P.hosting}. Like most hosts, it records technical data for every visit (IP address, date and time, page requested, browser and operating system) to deliver the site and keep it secure. These logs are kept ${P.logRetention}.`,
          'Some tools work only inside your browser and never send anything to us: the lash style quiz, the refill date calculator, the language choice, and the "Add to calendar" and "Add a reminder" files, which are created on your device.',
        ],
      },
      {
        h: 'Booking requests',
        body: [
          'When you book, we collect: the service, date and time you chose, your name, your email address, your phone number (optional), whether it is your first visit, and an optional note.',
          'We use this to arrange and manage your appointment, send the confirmation and, if it is your first visit, offer a patch test. The legal basis is the contract you ask us to enter into.',
          'Please do not write health details in the note. If a treatment needs health information (for example allergies or eye conditions), Léa asks about it in person before the patch test or treatment.',
          `Consultation and patch-test notes: ${P.consultationNotes}.`,
          `Booking data is kept for ${P.bookingRetention}.`,
        ],
      },
      { h: 'Refill reminders (optional)', body: ['If you tick the box "Email me when my refill is due", we use your email address to send you one reminder per appointment. This is optional and only happens with your consent. You can withdraw it at any time by replying to the reminder or writing to us.'] },
      {
        h: 'Gift voucher requests',
        body: [
          "When you request a gift voucher, we collect: the amount, the recipient's first name, your name (optional), a short message (optional) and your email address. We use them to send you the payment link and the voucher.",
          `Voucher records are kept for ${P.voucherRetention}.`,
        ],
      },
      {
        h: 'Service providers and transfers abroad',
        body: [
          `Booking and voucher requests are processed and emailed using ${P.processor}. Our hosting provider is ${P.hosting}.`,
          'If a provider stores data outside Switzerland or the EU/EEA in a country without adequate data protection, we use recognised safeguards such as the EU Standard Contractual Clauses.',
        ],
      },
      { h: 'Links to other services', body: ['The site links to WhatsApp, Instagram and Google Maps. Nothing is sent to these services when you visit our site. They only receive data if you click a link and open them, and then their own privacy policies apply (WhatsApp and Instagram: Meta; Google Maps: Google). These companies may process data in the USA.'] },
      { h: 'Cookies and similar technologies', body: ['This website does not set cookies and does not use local storage, tracking pixels or fingerprinting. That is why there is no cookie banner. If this ever changes, we will update this policy and ask for your consent before any non-essential cookie is set.'] },
      {
        h: 'Your rights',
        body: [
          `You can ask what data we hold about you, have it corrected or deleted, object to its use, receive a copy in a common format, and withdraw any consent you gave. Write to ${B.email}. We may ask you to confirm your identity.`,
          'You can also complain to the Swiss Federal Data Protection and Information Commissioner (FDPIC, edoeb.admin.ch). If you live in the EU, you can contact the data protection authority in your country.',
        ],
      },
      { h: 'Security', body: ['The site is served over an encrypted connection (HTTPS). We limit access to your data to what is needed for your appointment or voucher.'] },
      { h: 'Changes', body: ['We update this policy when the website or our services change. The date at the top shows the latest version.'] },
    ],
  },
  terms: {
    title: 'Booking and voucher terms',
    updated: `Last updated: ${P.lastUpdated}`,
    sections: [
      { h: 'Who we are', body: [`These terms apply to treatments and gift vouchers from ${B.legalName}, ${B.street}, ${B.city}.`] },
      { h: 'Bookings', body: [`A booking request becomes binding once it is confirmed: ${T.confirmation}.`, `Deposit: ${T.deposit}.`] },
      { h: 'Cancelling, rescheduling and no-shows', body: [`You can cancel or move an appointment free of charge up to ${T.cancelNotice} before it starts. ${T.lateCancel}.`, `Late arrival: ${T.late}.`] },
      { h: 'Refills', body: [`${T.refill}.`] },
      { h: 'Prices and payment', body: [`Prices are shown in Swiss francs (CHF). ${T.vat}. Payment: ${T.payment}.`] },
      {
        h: 'Your health and the patch test',
        body: [
          'Before a treatment, please tell us about allergies, eye conditions, recent eye surgery, pregnancy or anything else that could affect it. A patch test is recommended before a first set.',
          'We may decline or stop a treatment if it does not seem safe for you.',
        ],
      },
      { h: 'Results and aftercare', body: ['How long lashes last depends on your natural lash cycle and on aftercare. We cannot guarantee how long a set will last.'] },
      { h: 'Complaints', body: [`If you are not happy with a treatment, contact us at ${B.email}. ${T.complaints}.`] },
      { h: 'Gift vouchers', body: [`Vouchers are valid for ${T.voucherValidity} from the date of purchase.`, `${T.voucherRefund}.`] },
      { h: 'Liability', body: ['We carry out every treatment with care. Liability is governed by Swiss law. Nothing in these terms limits liability for intent or gross negligence.'] },
      { h: 'Applicable law', body: [`Swiss law applies. Place of jurisdiction: ${T.jurisdiction}, subject to mandatory consumer protection rules.`] },
    ],
  },
  imprint: {
    title: 'Imprint',
    updated: '',
    sections: [
      { h: 'Business', body: [{ list: [B.legalName, `Owner: ${B.owner}`, `Legal form: ${Z.legalForm}`, `${B.street}, ${B.city}`, 'Switzerland'] }] },
      { h: 'Contact', body: [{ list: [`Email: ${B.email}`, `Phone: ${B.phone}`] }] },
      { h: 'Business registration', body: [`UID: ${Z.uid}`] },
      { h: 'Responsible for content', body: [B.owner] },
      { h: 'Liability for links', body: ['This site links to external websites. We have no influence on their content and are not responsible for it.'] },
    ],
  },
})

const fr = (T, P, Z) => ({
  privacy: {
    title: 'Politique de confidentialité',
    updated: `Dernière mise à jour : ${P.lastUpdated}`,
    sections: [
      { h: 'Responsable du traitement', body: [`Le responsable de ce site est ${contactLine}. Pour toute question ou demande liée à vos données, écrivez à ${B.email}.`] },
      {
        h: 'En bref',
        body: [{
          list: [
            'Ce site ne dépose aucun cookie et n’utilise aucun outil d’analyse, de publicité ou de suivi.',
            'Les polices, images et vidéos sont servies par ce site, pas par Google ni par d’autres tiers.',
            'Nous ne recevons des données personnelles que si vous envoyez une demande de réservation ou de bon cadeau, et nous ne les utilisons que pour cette demande.',
          ],
        }],
      },
      {
        h: 'Quand vous visitez le site',
        body: [
          `Le site est hébergé par ${P.hosting}. Comme la plupart des hébergeurs, il enregistre des données techniques à chaque visite (adresse IP, date et heure, page demandée, navigateur et système d’exploitation) pour afficher le site et le sécuriser. Ces journaux sont conservés ${P.logRetention}.`,
          'Certains outils fonctionnent uniquement dans votre navigateur et ne nous envoient rien : le quiz des styles, le calculateur de remplissage, le choix de la langue, ainsi que les fichiers « Ajouter au calendrier » et « Ajouter un rappel », créés sur votre appareil.',
        ],
      },
      {
        h: 'Demandes de réservation',
        body: [
          'Lors d’une réservation, nous recueillons : le soin, la date et l’heure choisis, votre nom, votre adresse e-mail, votre numéro de téléphone (facultatif), s’il s’agit de votre première visite, et une remarque facultative.',
          'Nous les utilisons pour organiser et gérer votre rendez-vous, envoyer la confirmation et, pour une première visite, proposer un test de tolérance. La base légale est le contrat que vous nous demandez de conclure.',
          'Merci de ne pas indiquer de données de santé dans la remarque. Si un soin nécessite des informations de santé (par exemple allergies ou affections oculaires), Léa vous les demande en personne avant le test ou le soin.',
          `Notes de consultation et de test : ${P.consultationNotes}.`,
          `Les données de réservation sont conservées ${P.bookingRetention}.`,
        ],
      },
      { h: 'Rappels de remplissage (facultatif)', body: ['Si vous cochez « M’envoyer un e-mail quand mon remplissage approche », nous utilisons votre adresse e-mail pour vous envoyer un rappel par rendez-vous. C’est facultatif et ne se fait qu’avec votre consentement, que vous pouvez retirer à tout moment en répondant au rappel ou en nous écrivant.'] },
      {
        h: 'Demandes de bons cadeaux',
        body: [
          'Lors d’une demande de bon cadeau, nous recueillons : le montant, le prénom de la personne qui le reçoit, votre nom (facultatif), un court message (facultatif) et votre adresse e-mail. Nous les utilisons pour vous envoyer le lien de paiement et le bon.',
          `Les données des bons sont conservées ${P.voucherRetention}.`,
        ],
      },
      {
        h: 'Prestataires et transferts à l’étranger',
        body: [
          `Les demandes de réservation et de bons sont traitées et envoyées par e-mail via ${P.processor}. Notre hébergeur est ${P.hosting}.`,
          'Si un prestataire conserve des données hors de Suisse ou de l’UE/EEE dans un pays sans protection adéquate, nous utilisons des garanties reconnues comme les clauses contractuelles types de l’UE.',
        ],
      },
      { h: 'Liens vers d’autres services', body: ['Le site renvoie vers WhatsApp, Instagram et Google Maps. Rien n’est envoyé à ces services lorsque vous visitez notre site. Ils ne reçoivent des données que si vous cliquez sur un lien et les ouvrez ; leurs propres politiques de confidentialité s’appliquent alors (WhatsApp et Instagram : Meta ; Google Maps : Google). Ces entreprises peuvent traiter des données aux États-Unis.'] },
      { h: 'Cookies et technologies similaires', body: ['Ce site ne dépose pas de cookies et n’utilise ni stockage local, ni pixels de suivi, ni empreinte numérique. C’est pourquoi il n’y a pas de bandeau cookies. Si cela change, nous mettrons cette politique à jour et demanderons votre consentement avant tout cookie non essentiel.'] },
      {
        h: 'Vos droits',
        body: [
          `Vous pouvez demander quelles données nous détenons sur vous, les faire corriger ou supprimer, vous opposer à leur utilisation, en recevoir une copie dans un format courant et retirer tout consentement donné. Écrivez à ${B.email}. Nous pouvons vous demander de confirmer votre identité.`,
          'Vous pouvez aussi vous adresser au Préposé fédéral à la protection des données et à la transparence (PFPDT, edoeb.admin.ch). Si vous vivez dans l’UE, vous pouvez contacter l’autorité de protection des données de votre pays.',
        ],
      },
      { h: 'Sécurité', body: ['Le site est servi par une connexion chiffrée (HTTPS). L’accès à vos données est limité à ce qui est nécessaire pour votre rendez-vous ou votre bon.'] },
      { h: 'Modifications', body: ['Nous mettons cette politique à jour lorsque le site ou nos services changent. La date en haut indique la dernière version.'] },
    ],
  },
  terms: {
    title: 'Conditions de réservation et des bons',
    updated: `Dernière mise à jour : ${P.lastUpdated}`,
    sections: [
      { h: 'Qui nous sommes', body: [`Ces conditions s’appliquent aux soins et aux bons cadeaux de ${B.legalName}, ${B.street}, ${B.city}.`] },
      { h: 'Réservations', body: [`Une demande de réservation devient ferme une fois confirmée : ${T.confirmation}.`, `Acompte : ${T.deposit}.`] },
      { h: 'Annulation, report et absence', body: [`Vous pouvez annuler ou déplacer un rendez-vous gratuitement jusqu’à ${T.cancelNotice} avant son début. ${T.lateCancel}.`, `Retard : ${T.late}.`] },
      { h: 'Remplissages', body: [`${T.refill}.`] },
      { h: 'Prix et paiement', body: [`Les prix sont indiqués en francs suisses (CHF). ${T.vat}. Paiement : ${T.payment}.`] },
      {
        h: 'Votre santé et le test de tolérance',
        body: [
          'Avant un soin, merci de nous signaler toute allergie, affection oculaire, chirurgie récente des yeux, grossesse ou autre élément pouvant l’influencer. Un test de tolérance est recommandé avant une première pose.',
          'Nous pouvons refuser ou interrompre un soin s’il ne semble pas sûr pour vous.',
        ],
      },
      { h: 'Résultats et soins', body: ['La tenue des cils dépend de votre cycle naturel et des soins apportés. Nous ne pouvons pas garantir la durée d’une pose.'] },
      { h: 'Réclamations', body: [`Si vous n’êtes pas satisfaite d’un soin, contactez-nous à ${B.email}. ${T.complaints}.`] },
      { h: 'Bons cadeaux', body: [`Les bons sont valables ${T.voucherValidity} à partir de la date d’achat.`, `${T.voucherRefund}.`] },
      { h: 'Responsabilité', body: ['Chaque soin est réalisé avec soin. La responsabilité est régie par le droit suisse. Rien dans ces conditions ne limite la responsabilité en cas de faute intentionnelle ou de négligence grave.'] },
      { h: 'Droit applicable', body: [`Le droit suisse s’applique. For juridique : ${T.jurisdiction}, sous réserve des règles impératives de protection des consommateurs.`] },
    ],
  },
  imprint: {
    title: 'Mentions légales',
    updated: '',
    sections: [
      { h: 'Entreprise', body: [{ list: [B.legalName, `Titulaire : ${B.owner}`, `Forme juridique : ${Z.legalForm}`, `${B.street}, ${B.city}`, 'Suisse'] }] },
      { h: 'Contact', body: [{ list: [`E-mail : ${B.email}`, `Téléphone : ${B.phone}`] }] },
      { h: 'Inscription', body: [`IDE : ${Z.uid}`] },
      { h: 'Responsable du contenu', body: [B.owner] },
      { h: 'Responsabilité pour les liens', body: ['Ce site renvoie vers des sites externes. Nous n’avons aucune influence sur leur contenu et n’en sommes pas responsables.'] },
    ],
  },
})

const de = (T, P, Z) => ({
  privacy: {
    title: 'Datenschutzerklärung',
    updated: `Zuletzt aktualisiert: ${P.lastUpdated}`,
    sections: [
      { h: 'Verantwortliche Stelle', body: [`Verantwortlich für diese Website ist ${contactLine}. Für Fragen oder Anliegen zum Datenschutz schreib an ${B.email}.`] },
      {
        h: 'Kurz gesagt',
        body: [{
          list: [
            'Diese Website setzt keine Cookies und verwendet keine Analyse-, Werbe- oder Tracking-Tools.',
            'Schriften, Bilder und Videos werden von dieser Website geladen, nicht von Google oder anderen Dritten.',
            'Personendaten erhalten wir nur, wenn du eine Buchungs- oder Gutscheinanfrage sendest, und wir verwenden sie nur dafür.',
          ],
        }],
      },
      {
        h: 'Wenn du die Website besuchst',
        body: [
          `Die Website wird von ${P.hosting} gehostet. Wie die meisten Hoster speichert er bei jedem Besuch technische Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem), um die Website auszuliefern und zu schützen. Diese Protokolle werden ${P.logRetention} aufbewahrt.`,
          'Einige Funktionen laufen nur in deinem Browser und senden uns nichts: das Stil-Quiz, der Auffüll-Rechner, die Sprachwahl sowie die Dateien «Zum Kalender hinzufügen» und «Erinnerung hinzufügen», die auf deinem Gerät erstellt werden.',
        ],
      },
      {
        h: 'Buchungsanfragen',
        body: [
          'Bei einer Buchung erfassen wir: die gewählte Behandlung, Datum und Zeit, deinen Namen, deine E-Mail-Adresse, deine Telefonnummer (freiwillig), ob es dein erster Besuch ist, und eine freiwillige Notiz.',
          'Wir verwenden diese Angaben, um deinen Termin zu organisieren, die Bestätigung zu senden und dir beim ersten Besuch einen Verträglichkeitstest anzubieten. Rechtsgrundlage ist der Vertrag, den du mit uns abschliessen möchtest.',
          'Bitte schreib keine Gesundheitsangaben in die Notiz. Braucht eine Behandlung Gesundheitsinformationen (zum Beispiel Allergien oder Augenerkrankungen), fragt Léa dich persönlich vor dem Test oder der Behandlung.',
          `Beratungs- und Testnotizen: ${P.consultationNotes}.`,
          `Buchungsdaten werden ${P.bookingRetention} aufbewahrt.`,
        ],
      },
      { h: 'Auffüll-Erinnerungen (freiwillig)', body: ['Wenn du «Mir eine E-Mail schicken, wenn das Auffüllen fällig ist» ankreuzt, schicken wir dir pro Termin eine Erinnerung an deine E-Mail-Adresse. Das ist freiwillig und geschieht nur mit deiner Einwilligung, die du jederzeit widerrufen kannst, indem du auf die Erinnerung antwortest oder uns schreibst.'] },
      {
        h: 'Gutscheinanfragen',
        body: [
          'Bei einer Gutscheinanfrage erfassen wir: den Betrag, den Vornamen der beschenkten Person, deinen Namen (freiwillig), eine kurze Nachricht (freiwillig) und deine E-Mail-Adresse. Wir verwenden sie, um dir den Zahlungslink und den Gutschein zu senden.',
          `Gutscheindaten werden ${P.voucherRetention} aufbewahrt.`,
        ],
      },
      {
        h: 'Dienstleister und Übermittlung ins Ausland',
        body: [
          `Buchungs- und Gutscheinanfragen werden über ${P.processor} verarbeitet und per E-Mail versendet. Unser Hoster ist ${P.hosting}.`,
          'Speichert ein Dienstleister Daten ausserhalb der Schweiz oder der EU/des EWR in einem Land ohne angemessenen Datenschutz, verwenden wir anerkannte Garantien wie die EU-Standardvertragsklauseln.',
        ],
      },
      { h: 'Links zu anderen Diensten', body: ['Die Website verlinkt auf WhatsApp, Instagram und Google Maps. Beim Besuch unserer Website wird nichts an diese Dienste gesendet. Sie erhalten nur Daten, wenn du einen Link anklickst und sie öffnest; dann gelten ihre eigenen Datenschutzerklärungen (WhatsApp und Instagram: Meta; Google Maps: Google). Diese Unternehmen können Daten in den USA bearbeiten.'] },
      { h: 'Cookies und ähnliche Technologien', body: ['Diese Website setzt keine Cookies und verwendet weder lokalen Speicher noch Tracking-Pixel oder Fingerprinting. Deshalb gibt es kein Cookie-Banner. Sollte sich das ändern, passen wir diese Erklärung an und holen deine Einwilligung ein, bevor ein nicht notwendiges Cookie gesetzt wird.'] },
      {
        h: 'Deine Rechte',
        body: [
          `Du kannst Auskunft über deine gespeicherten Daten verlangen, sie berichtigen oder löschen lassen, der Verwendung widersprechen, eine Kopie in einem gängigen Format erhalten und erteilte Einwilligungen widerrufen. Schreib an ${B.email}. Wir können dich bitten, deine Identität zu bestätigen.`,
          'Du kannst dich auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten wenden (EDÖB, edoeb.admin.ch). Wohnst du in der EU, kannst du die Datenschutzbehörde in deinem Land kontaktieren.',
        ],
      },
      { h: 'Sicherheit', body: ['Die Website wird über eine verschlüsselte Verbindung (HTTPS) ausgeliefert. Der Zugriff auf deine Daten ist auf das beschränkt, was für deinen Termin oder Gutschein nötig ist.'] },
      { h: 'Änderungen', body: ['Wir aktualisieren diese Erklärung, wenn sich die Website oder unsere Angebote ändern. Das Datum oben zeigt die aktuelle Version.'] },
    ],
  },
  terms: {
    title: 'Buchungs- und Gutscheinbedingungen',
    updated: `Zuletzt aktualisiert: ${P.lastUpdated}`,
    sections: [
      { h: 'Wer wir sind', body: [`Diese Bedingungen gelten für Behandlungen und Geschenkgutscheine von ${B.legalName}, ${B.street}, ${B.city}.`] },
      { h: 'Buchungen', body: [`Eine Buchungsanfrage wird verbindlich, sobald sie bestätigt ist: ${T.confirmation}.`, `Anzahlung: ${T.deposit}.`] },
      { h: 'Stornieren, Verschieben und Nichterscheinen', body: [`Du kannst einen Termin bis ${T.cancelNotice} vor Beginn kostenlos absagen oder verschieben. ${T.lateCancel}.`, `Verspätung: ${T.late}.`] },
      { h: 'Auffüllen', body: [`${T.refill}.`] },
      { h: 'Preise und Zahlung', body: [`Die Preise sind in Schweizer Franken (CHF) angegeben. ${T.vat}. Zahlung: ${T.payment}.`] },
      {
        h: 'Deine Gesundheit und der Verträglichkeitstest',
        body: [
          'Bitte informiere uns vor einer Behandlung über Allergien, Augenerkrankungen, kürzliche Augenoperationen, eine Schwangerschaft oder anderes, das die Behandlung beeinflussen könnte. Vor dem ersten Set wird ein Verträglichkeitstest empfohlen.',
          'Wir können eine Behandlung ablehnen oder abbrechen, wenn sie für dich nicht sicher scheint.',
        ],
      },
      { h: 'Ergebnis und Pflege', body: ['Wie lange Wimpern halten, hängt von deinem natürlichen Wimpernzyklus und der Pflege ab. Wir können keine bestimmte Haltbarkeit garantieren.'] },
      { h: 'Reklamationen', body: [`Wenn du mit einer Behandlung nicht zufrieden bist, melde dich unter ${B.email}. ${T.complaints}.`] },
      { h: 'Geschenkgutscheine', body: [`Gutscheine sind ab Kaufdatum ${T.voucherValidity} gültig.`, `${T.voucherRefund}.`] },
      { h: 'Haftung', body: ['Wir führen jede Behandlung mit Sorgfalt aus. Die Haftung richtet sich nach Schweizer Recht. Nichts in diesen Bedingungen beschränkt die Haftung für Vorsatz oder grobe Fahrlässigkeit.'] },
      { h: 'Anwendbares Recht', body: [`Es gilt Schweizer Recht. Gerichtsstand: ${T.jurisdiction}, vorbehaltlich zwingender Bestimmungen zum Konsumentenschutz.`] },
    ],
  },
  imprint: {
    title: 'Impressum',
    updated: '',
    sections: [
      { h: 'Unternehmen', body: [{ list: [B.legalName, `Inhaberin: ${B.owner}`, `Rechtsform: ${Z.legalForm}`, `${B.street}, ${B.city}`, 'Schweiz'] }] },
      { h: 'Kontakt', body: [{ list: [`E-Mail: ${B.email}`, `Telefon: ${B.phone}`] }] },
      { h: 'Handelsregister', body: [`UID: ${Z.uid}`] },
      { h: 'Verantwortlich für den Inhalt', body: [B.owner] },
      { h: 'Haftung für Links', body: ['Diese Website verlinkt auf externe Websites. Auf deren Inhalt haben wir keinen Einfluss und übernehmen dafür keine Verantwortung.'] },
    ],
  },
})

const BUILDERS = { en, fr, de }

// The three legal pages in the given language, built from that language's texts.
export function legalFor(lang, t) {
  return (BUILDERS[lang] ?? en)(t.terms, t.privacyFacts, t.biz)
}
