export function TimesDateToInput(timestamp: number): string | undefined {
  const date: Date = new Date(timestamp) || undefined;

  if (date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const d: string = yyyy + '-' + mm + '-' + dd;

    return d;
  } else {
    return undefined;
  }
}
