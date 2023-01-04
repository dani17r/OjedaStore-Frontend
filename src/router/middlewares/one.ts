export const verifyToken = (to: any) => {
  if (to.params.token.length == 228) return true;
  else return { name: "error-404" };
};
