export function currency(num) {
  const n = parseInt(num, 10);
  return `NT$ ${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time) {
  const newDate = new Date(time);
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${newDate.getFullYear()}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
