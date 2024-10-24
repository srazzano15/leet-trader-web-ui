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

