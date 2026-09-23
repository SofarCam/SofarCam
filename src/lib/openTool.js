export const TOOL_IDS = ['concepts', 'hooks', 'captions', 'linkedin', 'analyzer']

export function openTool(id) {
  history.replaceState(null, '', `#${id}`)
  window.dispatchEvent(new CustomEvent('open-tool', { detail: id }))
}
