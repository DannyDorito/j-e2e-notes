export const AddPossesive = (text: string | undefined): string => {
  if (text === undefined) {
    return '';
  } else if (text.trim().endsWith('s')) {
    return text + `'`;
  } else {
    return text + `'s`;
  }
};
