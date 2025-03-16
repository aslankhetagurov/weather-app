import { TIsDay } from '../store/useWeatherData';
import { TWeatherCode } from '../types/TWeatherCode';

export const selectBackgroundImage = (
    weatherCode: TWeatherCode,
    isDay: TIsDay
): string => {
    if (!isDay) return 'night.webp';

    switch (weatherCode) {
        case 0:
        case 1:
            return 'sunny.webp';
        case 2:
            return 'cloud-sunny.webp';
        case 3:
            return 'cloudy.webp';
        case 45:
        case 48:
            return 'misty.webp';
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return 'rainy.webp';
        case 71:
        case 73:
        case 75:
        case 77:
            return 'snowy.webp';
        case 80:
        case 81:
        case 82:
            return 'rainy.webp';
        case 85:
        case 86:
            return 'snowy.webp';
        case 95:
        case 96:
        case 99:
            return 'stormy.webp';

        default:
            return 'sunny.webp';
    }
};
