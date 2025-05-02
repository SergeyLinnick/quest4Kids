import { formatDistanceToNow as formatDistanceToNowFns } from "date-fns";

export const formatDistanceToNow = (date: Date | string) => {
	return formatDistanceToNowFns(date, {
		addSuffix: true,
	});
};
