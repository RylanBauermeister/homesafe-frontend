const defaultState = {
  heatmap: {positions: [], options: {radius: 35, opacity: 1}},
  crimeWeights: {
    crimesAgainstPersons: 10,
    crisisAndInjury: 5,
    drugsAndVice: 5,
    miscCrimes: 5,
    propertyCrime: 5,
    trafficCrime: 5
  },
  changing_message: "loading..."
}

const transformDataToHeatmap = (data, state) => {
  let results = {
    positions: []
  }
  for(let crimeType in data){
    for(let crime of data[crimeType]){
      results.positions.push({
        lat: crime.lat,
        lng: crime.lon,
        weight: state.crimeWeights[crimeType]
      })
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

    default:
      return state;
  }
}
