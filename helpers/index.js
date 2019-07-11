/**
 * Returns an array with arrays of the given size.
 *
 * @param arr {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArray(arr, chunk_size) {
  const arrCopy = [...arr];
  const results = [];

  while (arrCopy.length) {
    results.push(arrCopy.splice(0, chunk_size));
  }

  return results;
}

/**
* @param {Date}  date
* @return {String} formated string from week number and Year eg. "362019"
*
*/

const getWeekNumber = (date) => {
  // Copy date so don't modify original

  let d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7

  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

  // Get first day of year
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return parseInt(`${weekNo}${d.getUTCFullYear()}`);
}

module.exports = { chunkArray, getWeekNumber };


