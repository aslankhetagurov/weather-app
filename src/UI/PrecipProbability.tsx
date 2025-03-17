import { BsCloudRain, BsCloudSnow } from 'react-icons/bs';
import { WEATHER_CODES } from '../consts/weatherCodes';
import { TWeatherCode } from '../types/TWeatherCode';

interface PrecipProbabilityProps {
    pop: number;
    weatherCode: TWeatherCode;
    styles?: string;
}

const precipProbabilityIcon = (weatherCode: TWeatherCode) => {
    if (WEATHER_CODES[weatherCode].toLowerCase().includes('snow')) {
        return <BsCloudSnow />;
    } else {
        return <BsCloudRain />;
    }
};

const PrecipProbability = ({
    pop,
    weatherCode,
    styles,
}: PrecipProbabilityProps) => {
    return (
        <div className={`flex items-center ${styles}`}>
            <p className="">{precipProbabilityIcon(weatherCode)}</p>
            <p>{pop}%</p>
        </div>
    );
};

export default PrecipProbability;
