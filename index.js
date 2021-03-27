let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), date
    })
    return employee
}

let createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let timeIn = employee.timeInEvents.find((e) => e.date === date)
    let timeOut = employee.timeOutEvents.find((e) => e.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked*employee["payPerHour"]
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map((e) => e.date)

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(employees, firstName) {
  return employees.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(employee){
    return employee.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}