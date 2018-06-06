// utilites for objects

/**
 * Returns a string from an object's key values
 * @param obj the object to operate on
 */
export const makeKeyStr = (obj: Object): string => {
  return Object.keys(obj).map(x => obj[x]).reduce((a, x) => a += x, '');
};
