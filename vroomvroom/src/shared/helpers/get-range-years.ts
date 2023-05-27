function getRangeYear(fromYear: number, toYear: number = new Date().getFullYear()) {
  return Array.from(Array(toYear - fromYear + 1).keys(), (number) => ({ text: number + fromYear, value: number + fromYear }));
}

export default getRangeYear;
