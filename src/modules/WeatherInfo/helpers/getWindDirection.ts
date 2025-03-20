export const getWindDirection = (degrees: number): string => {
    degrees = ((degrees % 360) + 360) % 360;

    if (degrees >= 337.5 || degrees < 22.5) return 'North';
    if (degrees < 67.5) return 'Northeast';
    if (degrees < 112.5) return 'East';
    if (degrees < 157.5) return 'Southeast';
    if (degrees < 202.5) return 'South';
    if (degrees < 247.5) return 'Southwest';
    if (degrees < 292.5) return 'West';
    if (degrees < 337.5) return 'Northwest';

    return 'Unknown';
};
