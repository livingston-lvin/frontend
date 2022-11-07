

export const isNumeric = (event: any) => {
  let pattern = /^([0-9])$/;
  return pattern.test(event.key);
}


export const isNumericDecimal = (event: any) => {
  let pattern = /^\d*\.?\d*$/;
  return pattern.test(event.key);
}
