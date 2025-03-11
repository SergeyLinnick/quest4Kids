export const getUserInitials = (name: string) => {
	const firstLetters = name?.charAt(0) + name?.charAt(1);
	const upperCaseFirstLetters = firstLetters.toUpperCase() || "US";
	return upperCaseFirstLetters;
};
