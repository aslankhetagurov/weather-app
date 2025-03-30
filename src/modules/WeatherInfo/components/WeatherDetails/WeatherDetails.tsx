import { useEffect, useRef } from 'react';
import { WiHumidity, WiWindDeg } from 'react-icons/wi';
import { FiWind, FiSunrise, FiSunset } from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';

import useWeatherData, {
    selectWeatherData,
} from '../../../../store/useWeatherData';
import { WEATHER_CODES } from '../../../../consts/weatherCodes';
import { getUVLevel } from '../../../../helpers/getUVLevel';
import { getDateAndTime } from '../../helpers/getDateAndTime';
import { getWindDirection } from '../../helpers/getWindDirection';
import { updateSunPosition } from '../../helpers/updateSunPosition';

const WeatherDetails = () => {
    const weatherData = useWeatherData(selectWeatherData);
    if (!weatherData) return null;

    const { current, daily } = weatherData;

    const humidity = current.relative_humidity_2m;
    const windDirection = current.wind_direction_10m;
    const windSpeed = current.wind_speed_10m;
    const weatherCode = current.weather_code;
    const timezone = weatherData.timezone;
    const uv = daily.uv_index_max[0];
    const sunrise = daily.sunrise[0];
    const sunset = daily.sunset[0];

    const sunLineRef = useRef<HTMLSpanElement | null>(null);
    const sunIconRef = useRef<HTMLSpanElement | null>(null);

    useEffect(
        () =>
            updateSunPosition(
                sunLineRef,
                sunIconRef,
                sunrise,
                sunset,
                timezone
            ),
        [sunrise, sunset]
    );

    return (
        <div className="h-full py-5 flex flex-col gap-3 font-bold">
            <p className="details-item gap-1 justify-center mt-auto">
                <WiHumidity className=" text-2xl" />
                <span>{humidity}</span>
            </p>

            <p className="details-item gap-1">
                <span className="flex items-center ">UVMax - </span>{' '}
                <span>{getUVLevel(uv)}</span>
            </p>

            <p className="details-item gap-1">
                <span className="flex items-center gap-0.5">
                    <FiWind className="text-2xl" /> {windSpeed}km/h,
                </span>

                <span className="flex items-center gap-0.5">
                    <WiWindDeg className="text-2xl" />{' '}
                    {getWindDirection(windDirection)}
                </span>
            </p>

            <p className="details-item gap-2">
                <span className="flex items-center gap-1">
                    {getDateAndTime(sunrise)[1]}
                    <FiSunrise className="text-xl" />
                </span>
                <span
                    className="w-40 h-0.5 bg-white/50 mx-1 rounded-sm relative flex items-center"
                    ref={sunLineRef}
                >
                    <span
                        className="absolute text-amber-300 text-2xl rotate-21"
                        ref={sunIconRef}
                    >
                        <IoSunny />
                    </span>
                </span>
                <span className="flex items-center gap-1">
                    <FiSunset className="text-xl" />
                    {getDateAndTime(sunset)[1]}
                </span>
            </p>

            <p className="text-start text-5xl font-bold backdrop-blur-3xl backdrop-brightness-99 bg-[#ffffff40] rounded-md overflow-hidden w-max px-2.5">
                {WEATHER_CODES[weatherCode].toUpperCase()}
            </p>
        </div>
    );
};

export default WeatherDetails;
