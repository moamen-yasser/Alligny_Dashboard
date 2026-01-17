export const formatDateTime = (dateInput) => {
    if (!dateInput) return "N/A";

    try {
        const date = new Date(dateInput);

        // Check if date is valid
        if (isNaN(date.getTime())) return "N/A";

        const month = date.getMonth() + 1; // Months are 0-indexed
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Convert to 12-hour format
        const period = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight
        const formattedHours = String(hours).padStart(2, '0');

        return `${month}/${day}/${year} and ${formattedHours}:${minutes} ${period}`;
    } catch (error) {
        return "N/A";
    }
};
