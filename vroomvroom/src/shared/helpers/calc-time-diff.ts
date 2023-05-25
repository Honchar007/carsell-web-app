function calcTimeDiff(expDate: string): number {
  const curDate = +new Date();
  const endDate = +new Date(expDate);
  return endDate - curDate;
}

export default calcTimeDiff;
