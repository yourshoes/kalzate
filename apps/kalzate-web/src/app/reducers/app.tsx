export function hydrate(state, data) {
  return { ...state, ...data, ready: true };
}
