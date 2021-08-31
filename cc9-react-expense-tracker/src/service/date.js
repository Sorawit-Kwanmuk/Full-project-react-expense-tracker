const formatShortMonthShortYear = value => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(
    value
  );
};

export { formatShortMonthShortYear };
