export default (to: any) => {
  if (to.params.token.length == 216) {
    return true;
  } else return { name: "error-404" };
};
