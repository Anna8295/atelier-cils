// The 3-question lash quiz, shared by the style guide and the chat assistant.
// look 0–2, natural lashes 0–2, mascara 0–2 → suggested style id
export function suggest({ look, nat, masc }) {
  if (look === 0 && nat >= 1) return 'lift'
  const score = look * 2 + masc
  let r = score <= 1 ? 'classic' : score <= 3 ? 'hybrid' : score <= 5 ? 'volume' : 'mega'
  if (nat === 0 && r === 'mega') r = 'volume' // fine lashes can't carry mega fans
  if (nat === 0 && r === 'classic') r = 'hybrid'
  return r
}
