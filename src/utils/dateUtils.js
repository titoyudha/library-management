const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isAfter = (date1, date2) => {
  return date1 > date2;
};

module.exports = {
  addDays,
  isAfter,
};
