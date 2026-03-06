/**
 * sessionStore — lightweight localStorage-backed session memory
 * Saves generated outputs per tool so nothing is lost between tab switches.
 * Also holds the "active concept" for chained workflow.
 */

const PREFIX = 'sofarcontent_'

export function saveSession(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {}
}

export function loadSession(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearSession(key) {
  try { localStorage.removeItem(PREFIX + key) } catch {}
}

// Active concept — set by Concept Generator, read by Hook/Caption Writers
export function setActiveConcept(concept) {
  saveSession('active_concept', concept)
}

export function getActiveConcept() {
  return loadSession('active_concept')
}

export function clearActiveConcept() {
  clearSession('active_concept')
}
