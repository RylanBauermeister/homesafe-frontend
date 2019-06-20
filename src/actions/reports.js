export const setReports = (reports) => {
  return {type: "SET_REPORTS", payload: {reports}}
}

export const addReport = (report) => {
  return {type: "ADD_REPORT", payload: {report}}
}

export const toggleReportDisplay = () => {
  return {type: "TOGGLE_REPORT"}
}

export const updateLikes = (report, likes) => {
  return {type: "UPDATE_LIKES", payload: {report, likes: [...likes]}}
}
