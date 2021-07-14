// Your code here
const createEmployeeRecord = function (element) {
  return {
    firstName: element[0],
    familyName: element[1],
    title: element[2],
    payPerHour: element[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (employeeData) {
  return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = function (object, dateStamp) {
  const [date, time] = dateStamp.split(" ");
  const timeAsNumber = parseInt(time);
  object.timeInEvents.push({
    type: "TimeIn",
    hour: timeAsNumber,
    date,
  });
  return object;
};

const createTimeOutEvent = function (object, dateStamp) {
  const [date, time] = dateStamp.split(" ");
  const timeAsNumber = parseInt(time);
  object.timeOutEvents.push({
    type: "TimeOut",
    hour: timeAsNumber,
    date,
  });
  return object;
};

const hoursWorkedOnDate = function (object, designatedDate) {
  const punchIn = object.timeInEvents.find((dateIn) => {
    return dateIn.date === designatedDate;
  });
  const punchOut = object.timeOutEvents.find((dateOut) => {
    return dateOut.date === designatedDate;
  });
  const hoursWorked = (punchOut.hour - punchIn.hour) * 0.01;
  return hoursWorked;
};

const wagesEarnedOnDate = function (object, designatedDate) {
  const payRate = object.payPerHour * hoursWorkedOnDate(object, designatedDate);
  return payRate;
};

const allWagesFor = function (object) {
  const dates = object.timeInEvents.map(function (eligible) {
    return eligible.date;
  });
  const payForDates = dates.reduce(function (element, dates) {
    return element + wagesEarnedOnDate(object, dates);
  }, 0);
  return payForDates;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((result) => {
    return result.firstName === firstName;
  });
};

const calculatePayroll = function (employeeRecords) {
  return employeeRecords.reduce(function (element, record) {
    return element + allWagesFor(record);
  }, 0);
};
