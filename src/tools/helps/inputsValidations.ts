export const empty = (val: string) => {
  if (val.length < 1) return "Please type something";
};
export const mini =
  (min = 3) =>
  (val: string) => {
    if (val.length + 1 <= min) return "The length is too short";
  };
export const verifyValue = (verify: string) => (val: string) => {
  if (val != verify) return "values do not match";
};
