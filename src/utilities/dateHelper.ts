// Formats the DateTime object from DB to dd-mm-yyyy
const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1 < 10 ? "0" + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
  const day = dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();

  return day + "-" + month + "-" + year;
};

export { formatDate };
