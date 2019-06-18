export const set_map = (map) => {
  return {type: "ASSIGN_MAP", payload: {heatmap: map}}
}

export const set_user = (user) => {
  return {type: "SET_USER", payload: {user}}
}

export const adjust_weight = (crimeType, weight) => {
  return {type: "ADJUST_WEIGHT", payload: {crimeType: crimeType, weight: weight}}
}

export const set_directions = (directions) => {
  return {type: "SET_DIRECTIONS", payload: {directions}}
}

export const set_signature = (signature) => {
  return {type: "SET_SIGNATURE", payload: {signature}}
}

export const set_weights = (weights) => {
  return {type: "SET_WEIGHTS", payload: {weights}}
}

export const set_window_size = () => {
  return {type: "SET_WINDOW_SIZE"}
}
