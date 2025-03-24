export const capitalizeFirstLetters = (locationName: string) => {
    if (!locationName) return;

    return locationName
        .split(' ')
        .map((str) =>
            str.split('').toSpliced(0, 1, str.charAt(0).toUpperCase()).join('')
        )
        .join(' ');
};
