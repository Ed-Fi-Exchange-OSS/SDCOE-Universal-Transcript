export const textTransform = (string, transformCase) => {
  switch (transformCase) {
    case 'uppercase':
      return string.toUpperCase();
    case 'lowercase':
      return string.toLowerCase();
    default:
      return string;
  }
};
