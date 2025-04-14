/**
 * Calculates the time difference between the given date and now
 * @param dateString - ISO 8601 date string or any format accepted by the Date constructor
 * @returns A human-readable string representing the time difference
 */
export function getTimeDifference(dateString: string): string {
	const date: Date = new Date(dateString);
	const now: Date = new Date();
	const diffInMs: number = now.getTime() - date.getTime();
	const diffInMinutes: number = Math.floor(diffInMs / (1000 * 60));
	const diffInHours: number = Math.floor(diffInMinutes / 60);
	const diffInDays: number = Math.floor(diffInHours / 24);

	switch (true) {
		case diffInDays >= 1:
			return `${diffInDays} day(s)`;
		case diffInHours >= 1:
			return `${diffInHours} hour(s)`;
		case diffInMinutes >= 1:
			return `${diffInMinutes} min(s)`;
		default:
			return "a moment ago";
	}
}
