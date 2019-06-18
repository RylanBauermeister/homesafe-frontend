const defaultState = {
  user: null,
  heatmap: {positions: [], options: {radius: 5, opacity: .75, maxIntesity: 100, dissipating:true}},
  crimeWeights: {
    crimesAgainstPersons: 0,
    crisisAndInjury: 0,
    drugsAndVice: 0,
    miscCrimes: 0,
    propertyCrime: 0,
    trafficCrime: 0
  },
  activeMarker: {},
  avoids: [],
  reports: [],
  crimes: {},
  signature: "",
  directions: {},
  showAvoids: true,
  showReports: true,
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  }
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

  if(state.showReports){
    for(let report of state.reports){
      results.positions.push({location: new window.google.maps.LatLng(report.lat, report.lng), weight: 100})
    }
  }


  if(state.showAvoids){
    for(let avoid of state.avoids){
      results.positions.push({location: new window.google.maps.LatLng(avoid.lat, avoid.lng), weight: 100})
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

  if(state.showReports){
    for(let report of state.reports){
      results.positions.push({location: new window.google.maps.LatLng(report.lat, report.lng), weight: 100})
    }
  }


  if(state.showAvoids){
    for(let avoid of state.avoids){
      results.positions.push({location: new window.google.maps.LatLng(avoid.lat, avoid.lng), weight: 100})
    }
  }

  return results;


}

export const userReducer = (state = defaultState, action) => {
  let newMap, newState;
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
      newMap = reWeightPositions(state, weights)
      return {
        ...state,
        crimeWeights: weights,
        heatmap: newMap
      }

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user
      }

    case "SET_REPORTS":
      return {
        ...state,
        reports: action.payload.reports
      }

    case "ADD_REPORT":
      return {
        ...state,
        reports: [...state.reports, action.payload.report]
      }

    case "SET_AVOIDS":
      return {
        ...state,
        avoids: action.payload.avoids
      }

    case "ADD_AVOID":
      return {
        ...state,
        avoids: [...state.avoids, action.payload.avoid]
      }

    case 'SET_DIRECTIONS':
      return {
        ...state,
        directions: action.payload.directions
      }

    case "SET_WEIGHTS":
      newMap = reWeightPositions(state, action.payload.weights)
      return {
        ...state,
        crimeWeights: action.payload.weights,
        heatmap: newMap
      }

      case "SET_SIGNATURE":
        return {
          ...state,
          signature: action.payload.signature
        }

      case "TOGGLE_AVOID":
        newState = {
          ...state,
          showAvoids: !state.showAvoids
        }
        reWeightPositions(newState, newState.crimeWeights)
        return newState

      case "TOGGLE_REPORT":
        newState = {
          ...state,
          showReports: !state.showReports
        }
        reWeightPositions(newState, newState.crimeWeights)
        return newState


      case "UPDATE_LIKES":
        let newReports = state.reports.map(report => {
          if(report.id !== action.payload.report.id) return report
          console.log(report)
          console.log(action.payload.likes)
          report.likes = action.payload.likes
          console.log(report)
          return report
        })
        return {
          ...state,
          reports: newReports
        }

      case "SET_WINDOW_SIZE":
        return {
          ...state,
          windowSize: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }

    default:
      return state;
  }
}
