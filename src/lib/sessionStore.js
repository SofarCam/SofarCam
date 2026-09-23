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

// Active video prompt — set by Concept Generator, read by Video Generator
export function setActiveVideoPrompt(prompt) {
  saveSession('active_video_prompt', prompt)
}

export function getActiveVideoPrompt() {
  return loadSession('active_video_prompt')
}

export function clearActiveVideoPrompt() {
  clearSession('active_video_prompt')
}

// Video generation history — small rolling log so users can compare takes
const VIDEO_HISTORY_LIMIT = 4

export function addVideoHistoryEntry(entry) {
  const history = loadSession('video_history') || []
  const next = [{ ...entry, ts: Date.now() }, ...history].slice(0, VIDEO_HISTORY_LIMIT)
  saveSession('video_history', next)
  return next
}

export function getVideoHistory() {
  return loadSession('video_history') || []
}
