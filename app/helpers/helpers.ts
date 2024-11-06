/**
 * Helper for Title-Casing a string on submission to the database
 */

export const toTitleCase = (value: string): string => {
  // return empty string if that is what was provided
  if (value.length === 0) return value;

  // create array of string parts
  let strArray = value.split("");

  // set the first index of the array as the capitalized version of itself
  strArray[0] = strArray[0].toUpperCase();

  // loop over the remaining array and capitalize each index that comes after an empty string
  const capitalized = strArray.map((char, index) => {
    return strArray[index - 1] === " " ? char.toUpperCase() : char;
  });

  return capitalized.join("");
};

export const getDomain = (url: string): string | null => {
  const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
  return match ? match[1] : null;
};


// Calculates gain or loss percentage with previous close and current price as params
export const calculatePercentChange = (currentPrice: number, prevClose: number): number => {
  if (currentPrice > prevClose) {

    const gainPercentage = ((currentPrice / prevClose - 1) * 100).toFixed(2);
    return parseFloat(gainPercentage);
  } else {
    const lossPercentage = (100 * (currentPrice / prevClose) - 100).toFixed(2);

    return parseFloat(lossPercentage)
  }
};
