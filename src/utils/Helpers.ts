export const formatIsActive = (active: boolean) => {
  return active ? "Si" : "No";
};

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-GB", options);
};
