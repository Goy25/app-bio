export function dayList(year, month) {
  const day = new Date(year, month, 0).getDate();
  const dayList = [];
  for (let i = 1; i <= day; i++) {
    dayList.push({label: `${i}`, value: i});
  }
  return dayList;
}

export function yearList() {
  const year = new Date().getFullYear();
  const yearList = [];
  for (let i = 0; i < 10; i++) {
      yearList.push({label: `${year - i}`, value: year - i});
  }
  return yearList;
}

export function getDay() {
  return new Date().getDate();
}

export function getMonth() {
  return new Date().getMonth() + 1;
}

export function getYear() {
  return new Date().getFullYear();
}