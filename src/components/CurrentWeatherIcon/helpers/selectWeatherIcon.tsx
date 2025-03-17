import {
    BsSun,
    BsClouds,
    BsCloudFog2,
    BsCloudDrizzle,
    BsCloudRain,
    BsCloudSnow,
    BsCloudRainHeavy,
    BsCloudLightningRain,
    BsCloudHail,
    BsCloudSun,
} from 'react-icons/bs';
import { TWeatherCode } from '../../../types/TWeatherCode';

const selectWeatherIcon = (weatherCode: TWeatherCode) => {
    switch (weatherCode) {
        case 0:
        case 1:
            return <BsSun />;
        case 2:
            return <BsCloudSun />;
        case 3:
            return <BsClouds />;
        case 45:
        case 48:
            return <BsCloudFog2 />;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return <BsCloudDrizzle />;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return <BsCloudRain />;
        case 71:
        case 73:
        case 75:
        case 77:
            return <BsCloudSnow />;
        case 80:
        case 81:
        case 82:
            return <BsCloudRainHeavy />;
        case 85:
        case 86:
            return <BsCloudSnow />;
        case 95:
            return <BsCloudLightningRain />;
        case 96:
        case 99:
            return <BsCloudHail />;

        default:
            return <BsSun />;
    }
};
export default selectWeatherIcon;
