import { setCookie } from "./setCookie";

/**
 * @constructor removeCookie from cookie in client-side.
 * @param {string} name - cookie name
 * @returns {void}
 * @example removeCookie("cookieName")
 */

export const removeCookie = (name: string) => {
	if (typeof document === "undefined" || !name) return null;

	setCookie(name, "");
};
