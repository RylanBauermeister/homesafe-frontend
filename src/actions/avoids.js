export const setAvoids = avoids => {
  return {type: "SET_AVOIDS", payload: {avoids}}
}

export const addAvoid = avoid => {
  return {type: "ADD_AVOID", payload: {avoid}}
}
