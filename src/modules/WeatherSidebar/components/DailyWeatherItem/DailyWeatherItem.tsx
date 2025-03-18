import { FC } from 'react';

import CurrentWeatherIcon from '../../../../components/CurrentWeatherIcon/CurrentWeatherIcon';
import { WEATHER_CODES } from '../../../../consts/weatherCodes';
import { formatTemp } from '../../../../helpers/formatTemp';
import { formatDate } from '../../helpers/formatDate';
import { IWeather } from '../../../../store/useWeatherData';
import PrecipProbability from '../../../../UI/PrecipProbability';

interface DailyWeatherItemProps {
    index: number;
    weatherData: IWeather;
}

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
            <CurrentWeatherIcon weatherCode={weatherCode} styles="mr-1.5" />
            <div className="mr-1.5 text-left overflow-hidden">
                <p className="truncate font-bold">
                    {formatDate(currentDate, date)}
                </p>
                <p className="text-gray-100 truncate">
                    {WEATHER_CODES[weatherCode]}
                </p>
            </div>
            <div className="ml-auto flex items-center">
                {!!pop && (
                    <PrecipProbability
                        pop={pop}
                        weatherCode={weatherCode}
                        styles="flex-col pr-1.5 min-w-7 w-7 text-blue-500"
                    />
                )}
                <div className="pl-1.5 border-l-1 border-gray-200 min-w-8 w-8 text-left">
                    <p>{formatTemp(tempMax)}</p>
                    <p>{formatTemp(tempMin)}</p>
                </div>
            </div>
        </li>
    );
};

export default DailyWeatherItem;
