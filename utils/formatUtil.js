export const formatUtil = {
  getLocalDate: (date) => {
    const newDate = new Date(date);
    const localDate = newDate.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    return localDate;
  },
};
