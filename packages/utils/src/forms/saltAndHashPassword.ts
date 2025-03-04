// import bcrypt from "bcryptjs";

export const saltAndHashPassword = (password: string): string => {
	if (!password) {
		throw new Error("Password is required");
	}

	// Generate a salt with 10 rounds (you can adjust this as needed)
	// const salt = bcrypt.genSaltSync(10);

	// Hash the password with the salt
	// const hashedPassword = bcrypt.hashSync(password, salt);

	// return hashedPassword;

	return password;
};
