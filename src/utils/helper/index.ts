import { DateTime } from "luxon";

export function parseDate(dateString: string): string  {
	const parsedDate = DateTime.fromFormat(dateString, "dd/MM/yyyy, HH:mm:ss");
	return parsedDate.toFormat("yyyy-MM-dd'T'HH:mm:ss");
}
