export function hydrate(state, payload) {
  return { ...state, ...payload, ready: true };
}
