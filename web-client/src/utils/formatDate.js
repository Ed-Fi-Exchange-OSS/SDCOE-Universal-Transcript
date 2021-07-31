export const formatDate = (datetime, separator = '/') => {
  let date = new Date(datetime).toISOString().slice(0, 10);
  let newDate = new Date(date);
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  let year = newDate.getFullYear();
  day = formatBelowTen(day);
  month = formatBelowTen(month);
  if (separator === '-') {
    return `${year}-${month}-${day}`;
  }
  return `${month}${separator}${day}${separator}${year}`;
};

export const formatBelowTen = value => {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
};
