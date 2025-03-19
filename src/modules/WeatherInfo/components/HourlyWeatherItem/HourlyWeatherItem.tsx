import { TbUvIndex } from 'react-icons/tb';

import { IHourlyWeather } from '../../../../store/useWeatherData';
import CurrentWeatherIcon from '../../../../components/CurrentWeatherIcon/CurrentWeatherIcon';
import { formatTemp } from '../../../../helpers/formatTemp';
import PrecipProbability from '../../../../UI/PrecipProbability';
import { getUVLevel } from '../../../../helpers/getUVLevel';

interface HourlyWeatherItemProps {
    hourlyData: IHourlyWeather;
    index: number;
    pastHours: number;
}

const HourlyWeatherItem = ({
    hourlyData,
    index,
    pastHours,
}: HourlyWeatherItemProps) => {
    const currentIndex = index + pastHours;
    const pop = hourlyData.precipitation_probability[currentIndex];
    const temp = hourlyData.temperature_2m[currentIndex];
    const time = hourlyData.time[currentIndex];
    const uv = hourlyData.uv_index[currentIndex];
    const weatherCode = hourlyData.weather_code[currentIndex];

    const getHourlyTime = () => {
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(Date.parse(time)).toLocaleTimeString('en-US', options);
    };

    return (
        <li className="text-[14px] backdrop-blur-[100px] py-0.5 px-2 rounded-md flex flex-col items-center min-w-18 max-w-18 border-1 border-white/40">
            <p className="mb-1 border-b-1 border-b-gray-300/65 font-bold">
                {!index ? 'Now' : getHourlyTime()}
            </p>
            <CurrentWeatherIcon weatherCode={weatherCode} styles="mb-1" />
            <div className="flex flex-col gap-1 pb-1.5 text-amber-300">
                <TbUvIndex className="text-xl/0 mx-auto" />
                <p className="text-[11px]/0">{getUVLevel(uv)}</p>
            </div>
            {!!pop && (
                <PrecipProbability
                    pop={pop}
                    weatherCode={weatherCode}
                    styles="gap-1 text-blue-500"
                />
            )}
            <span className="font-bold mt-auto text-[16px]">
                {formatTemp(temp)}
            </span>
        </li>
    );
};

export default HourlyWeatherItem;
