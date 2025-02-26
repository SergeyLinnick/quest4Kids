module.exports = {
	source: ["package.json", "packages/*/package.json", "apps/*/package.json"],
	filter: ".",
	semverRange: "",
	versionGroups: [
		{
			label: "Use workspace protocol for internal packages",
			packages: ["**"],
			dependencies: ["@repo/*"],
			pattern: "workspace:*",
			isIgnored: true,
		},
		{
			label: "Enforce same version for all packages",
			packages: ["**"],
			dependencies: ["**"],
			isSemverRange: false,
			isIgnored: false,
		},
	],
	sortFirst: ["name", "version", "private", "scripts", "dependencies", "devDependencies", "peerDependencies"],
	sortAuto: true,
	indent: "  ",
	lineEnding: "lf",
	removePrivate: false,
};
