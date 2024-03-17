export const convertUSDToVND = (usdAmount, exchangeRate) => {
  const vndAmount = usdAmount * exchangeRate;
  const roundedVNDAmount = Math.round(vndAmount);
  return roundedVNDAmount;
};
