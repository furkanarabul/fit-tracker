export function formatDate(created_at) {
	const dateObject = new Date(created_at);

	// Format date
	const dateOptions = { day: "numeric", month: "long", year: "numeric" };
	const formattedDate = dateObject.toLocaleDateString(undefined, dateOptions);

	// Format time
	const timeOptions = { hour: "2-digit", minute: "2-digit" };
	const formattedTime = dateObject.toLocaleTimeString(undefined, timeOptions);

	return `${formattedDate} ${formattedTime}`;
}
