import { FC } from 'react';

import CurrentWeatherIcon from '../../../../components/CurrentWeatherIcon/CurrentWeatherIcon';
import { WEATHER_CODES } from '../../../../consts/weatherCodes';
import { formatTemp } from '../../helpers/formatTemp';
import { formatDate } from '../../helpers/formatDate';
import { TWeatherCode } from '../../../../types/TWeatherCode';
import { BsCloudRain, BsCloudSnow } from 'react-icons/bs';
import { IWeather } from '../../../../store/useWeatherData';

interface DailyWeatherItemProps {
    index: number;
    weatherData: IWeather;
}

const precipProbabilityIcon = (weatherCode: TWeatherCode) => {
    if (WEATHER_CODES[weatherCode].toLowerCase().includes('snow')) {
        return <BsCloudSnow />;
    } else {
        return <BsCloudRain />;
    }
};

const DailyWeatherItem: FC<DailyWeatherItemProps> = ({
    weatherData,
    index,
}) => {
    const { current, daily } = weatherData;

    const currentDate = current.time;
    const date = daily.time[index];
    const tempMin = daily.temperature_2m_min[index];
    const tempMax = daily.temperature_2m_max[index];
    const pop = daily.precipitation_probability_max[index];
    const weatherCode = daily.weather_code[index];

    return (
        <li className="flex items-center">
            <span className="w-8 h-8 min-w-8 rounded-sm bg-white/10 flex justify-center items-center mr-1.5 text-[18px] ">
                <CurrentWeatherIcon weatherCode={weatherCode} />
            </span>
            <div className="mr-1.5 text-left overflow-hidden">
                <p className="truncate">{formatDate(currentDate, date)}</p>
                <p className="text-gray-400 truncate">
                    {WEATHER_CODES[weatherCode]}
                </p>
            </div>
            <div className="ml-auto flex items-center">
                {!!pop && (
                    <div className="pr-1.5 min-w-7 w-7 flex flex-col items-center">
                        <p className="">{precipProbabilityIcon(weatherCode)}</p>
                        <p>{pop}%</p>
                    </div>
                )}
                <div className="pl-1.5 border-l-1 border-gray-500 min-w-8 w-8 text-left">
                    <p>{formatTemp(tempMax)}</p>
                    <p>{formatTemp(tempMin)}</p>
                </div>
            </div>
        </li>
    );
};

export default DailyWeatherItem;
