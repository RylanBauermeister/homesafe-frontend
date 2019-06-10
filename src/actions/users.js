export const set_map = (map) => {
  return {type: "ASSIGN_MAP", payload: {heatmap: map}}
}

export const adjust_weight = (crimeType, weight) => {
  return {type: "ADJUST_WEIGHT", payload: {crimeType: crimeType, weight: weight}}
}
