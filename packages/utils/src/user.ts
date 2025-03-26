export const getUserInitials = (name: string) => {
	if (!name) return "US";

	const firstLetters = name?.charAt(0) + name?.charAt(1);
	const upperCaseFirstLetters = firstLetters.toUpperCase();
	return upperCaseFirstLetters;
};
