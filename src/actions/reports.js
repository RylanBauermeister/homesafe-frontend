export const setReports = (reports) => {
  return {type: "SET_REPORTS", payload: {reports}}
}

export const addReport = (report) => {
  return {type: "ADD_REPORT", payload: {report}}
}
