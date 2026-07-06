export const formatDate = (dateString, lang) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // Invalid date fallback
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  if (lang === 'vi') {
    return `${day}/${month}/${year}`;
  }
  
  return `${month}/${day}/${year}`;
};
