export const formatDateTime = (dateInput, language = 'en') => {
    if (!dateInput) return "N/A";

    try {
        const date = new Date(dateInput);

        // Check if date is valid
        if (isNaN(date.getTime())) return "N/A";

        // Format date part in English numerals (DD/MM/YYYY)
        const datePart = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }).format(date);

        // Format time part with localized markers (AM/PM or ص/م) but English numerals
        const timePart = new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            numberingSystem: 'latn'
        }).format(date);

        // Return with separator
        return `${datePart} | ${timePart}`;
    } catch (error) {
        return "N/A";
    }
};
