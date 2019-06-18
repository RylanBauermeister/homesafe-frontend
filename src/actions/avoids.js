export const setAvoids = avoids => {
  return {type: "SET_AVOIDS", payload: {avoids}}
}

export const addAvoid = avoid => {
  return {type: "ADD_AVOID", payload: {avoid}}
}

export const toggleAvoidDisplay = () => {
  return {type: "TOGGLE_AVOID"}
}
