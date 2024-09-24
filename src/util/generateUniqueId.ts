// Generate a unique ID based on timestamp and random number
export function generateUniqueId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  const millisecond = String(now.getMilliseconds()).padStart(3, '0'); // Add milliseconds, padded to 3 digits
  return `CS701:${year}${month}${day}${hour}${minute}${second}${millisecond}${Math.floor(
    Math.random() * 1000
  )}`;
}
