export function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

// Get the days in the month of the year
export function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function parseDate(date: string) {
  if (!date) return;
  const mdy = date.split('/'); // YYYY/MM/DD
  return new Date(+mdy[0], +mdy[1] - 1, +mdy[2]);
}

export function dateDiff(first: Date, second: Date) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round(
    (second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)
  );
}
