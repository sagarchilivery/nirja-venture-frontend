// Description: This file contains helper functions.
export function ConvertDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
}

export function ConvertTime(timestamp) {
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedTime;
}
