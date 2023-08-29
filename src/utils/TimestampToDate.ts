export function TimestampToDate(timestamp: number) {
  if (timestamp) {
    const date = new Date(timestamp).toLocaleDateString('tr-TR', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return date;
  }

  return 'Invalid Date';
}
