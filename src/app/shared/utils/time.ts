export const convertNumberMinutesToHMString = (minutes: number): string => {
  if (!minutes || minutes < 0) return '0m';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  else if (remainingMinutes === 0) return `${hours}h`;
  else return `${hours}h ${remainingMinutes}m`;
};

export const convertTimeTo12HourFormat = (time: string): string => {
  if (!time) return '00:00 am';
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'pm' : 'am';
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
}