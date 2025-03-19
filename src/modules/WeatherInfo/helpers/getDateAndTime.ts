export const getDateAndTime = (dateAndTime?: string): string[] => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        dateStyle: 'long',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
        timeStyle: 'short',
        hour12: false,
    };

    const newDate = dateAndTime
        ? new Date(Date.parse(dateAndTime))
        : new Date();

    const date = newDate.toLocaleDateString('en-US', dateOptions);
    const time = newDate.toLocaleTimeString('en-US', timeOptions);
    return [date, time];
};
