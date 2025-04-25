import { formatDistanceToNow as formatDistanceToNowFns } from "date-fns";

export const formatDistanceToNow = (date: Date) => {
	return formatDistanceToNowFns(date, {
		addSuffix: true,
	});
};
