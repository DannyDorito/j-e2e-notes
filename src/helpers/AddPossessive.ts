export const AddPossesive = (text: string): string => {
  if (text.trim().endsWith('s')) {
    return text + `'`;
  } else {
    return text + `'s`;
  }
};
