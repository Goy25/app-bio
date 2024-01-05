export function yearList() {
  const year = new Date().getFullYear();
  const yearList = [];
  for (let i = 0; i < 3; i++) {
      yearList.push({label: `${year - i}`, value: year - i});
  }
  return yearList;
}