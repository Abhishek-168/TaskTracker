
/**
 * Truncates a string if its longer then the max length
 * @param {string} str - the string to truncate
 * @param {number} maxLength - max allowed length before truncating
 * @returns {string} truncated string with "..." or original string
 */
export function truncate(str, maxLength) {
    if (!str) return "";
	return str.length > maxLength ?
					str.slice(0, maxLength) + "..." :
					str;
}