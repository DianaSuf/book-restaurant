export function formatDateToServer(data) {
  const [year, month, day] = data.split('-');
  return `${day}.${month}.${year}`;
}

export function formatDateToClient(data) {
  const [day, month, year] = data.split('.');
  return `${year}-${month}-${day}`;
}
