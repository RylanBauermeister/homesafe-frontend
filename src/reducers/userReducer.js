const defaultState = {
  heatmap: {positions: [], options: {radius: 5, opacity: .75, maxIntesity: 100, dissipating:true}},
  crimeWeights: {
    crimesAgainstPersons: 0,
    crisisAndInjury: 0,
    drugsAndVice: 0,
    miscCrimes: 0,
    propertyCrime: 0,
    trafficCrime: 10
  },
  crimes: {},
  changing_message: "loading..."
}

const transformDataToHeatmap = (data, state) => {
  state.crimes = data;
  let results = {
    positions: [],
    options: {radius: 50, opacity: 1}
  }
  console.log("foo")
  for(let crimeType in data){
    if (state.crimeWeights[crimeType] === 0) continue;
    for(let crime of data[crimeType]){
      results.positions.push({location: new window.google.maps.LatLng(crime.lat, crime.lon), weight: state.crimeWeights[crimeType]})
    }
  }
  return results;
}

const reWeightPositions = (state, weights) => {
  let results = {
    positions: [],
    options: {radius: 50, opacity: 1}
  }

  for(let crimeType in state.crimes){
    if (state.crimeWeights[crimeType] === 0) continue;
    for(let crime of state.crimes[crimeType]){
      results.positions.push({location: new window.google.maps.LatLng(crime.lat, crime.lon), weight: weights[crimeType]})
    }
  }
  return results;


}

export const userReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'ASSIGN_MAP':
      return {
        ...state,
        heatmap: transformDataToHeatmap(action.payload.heatmap, state),
        changing_message: "done!"
      }

    case 'ADJUST_WEIGHT':
      const weights = {
        ...state.crimeWeights,
        [action.payload.crimeType]: action.payload.weight
      }
      const newMap = reWeightPositions(state, weights)
      return {
        ...state,
        crimeWeights: weights,
        heatmap: newMap
      }

    default:
      return state;
  }
}
