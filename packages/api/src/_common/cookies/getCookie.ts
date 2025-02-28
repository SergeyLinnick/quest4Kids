/**
 * Get cookie value by name in client-side.
 * @param {string} name - cookie name
 * @returns {string} - cookie value
 */

export const getCookie = (name: string) => {
	if (typeof document === "undefined" || !name) return null;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
	return null;
};
