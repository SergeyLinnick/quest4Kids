/**
 * Set a cookie in client-side.
 * @param {string} name - cookie name
 * @param {string}  value - value to set
 * @returns {void}
 * @example setCookie("cookieName", "cookieValue")
 */
export const setCookie = (name: string, value: string) => {
  if (typeof document === "undefined" || !name) return null;
  // TODO: add options
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/;`;
};
