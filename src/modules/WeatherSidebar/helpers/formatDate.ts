export const formatDate = (currentDate: string, date: string) => {
    const newDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    };

    const todayOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
    };

    if (currentDate.includes(date))
        return `Today, ${newDate.toLocaleDateString('en-US', todayOptions)}`;

    return newDate.toLocaleDateString('en-US', options);
};
