import { useEffect, useRef } from 'react';
import { WiHumidity, WiWindDeg } from 'react-icons/wi';
import { FiWind, FiSunrise, FiSunset } from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';
import { TbUvIndex } from 'react-icons/tb';

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
    const sunLineRef = useRef<HTMLSpanElement | null>(null);
    const sunIconRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (
            weatherData?.daily.sunrise &&
            weatherData?.daily.sunset &&
            weatherData?.timezone &&
            sunLineRef.current &&
            sunIconRef.current
        ) {
            updateSunPosition(
                sunLineRef,
                sunIconRef,
                weatherData.daily.sunrise[0],
                weatherData.daily.sunset[0],
                weatherData.timezone,
            );
        }
    }, [weatherData]);

    if (!weatherData) {
        return null;
    }

    const current = weatherData.current;
    const daily = weatherData.daily;

    const humidity = current.relative_humidity_2m;
    const windDirection = current.wind_direction_10m;
    const windSpeed = current.wind_speed_10m;
    const weatherCode = current.weather_code;
    const pressure = current.surface_pressure;
    const uv = daily.uv_index_max?.[0];
    const sunrise = daily.sunrise?.[0];
    const sunset = daily.sunset?.[0];

    return (
        <div className="flex flex-col gap-3 h-full sm:py-2.5 font-bold">
            <ul className="grid grid-cols-2 grid-rows-2 sm:grid-cols-[140px_140px] sm:grid-rows-[140px_140px] gap-2.5">
                <li className="details-square-item">
                    <h4 className="details-square-item__title">
                        Humidity
                        <WiHumidity className="text-2xl" aria-hidden="true" />
                    </h4>
                    <span className="text-4xl">
                        {humidity !== undefined ? humidity : 'N/A'}%
                    </span>
                </li>

                <li className="details-square-item">
                    <h4 className="details-square-item__title">
                        UVMax
                        <TbUvIndex className="text-2xl" aria-hidden="true" />
                    </h4>
                    <span className="text-2xl">
                        {uv !== undefined ? getUVLevel(uv) : 'N/A'}
                    </span>
                </li>

                <li className="details-square-item">
                    <h4 className="details-square-item__title py-1">
                        Surface Pressure
                    </h4>
                    <span className="text-2xl">
                        {pressure !== undefined ? Math.round(pressure) : 'N/A'}
                        hPa
                    </span>
                </li>

                <li className="details-square-item">
                    <div className="mb-1.5">
                        <h4 className="details-square-item__title">
                            Wind Speed
                            <FiWind className="text-2xl" aria-hidden="true" />
                        </h4>
                        <span className="flex justify-center">
                            {windSpeed !== undefined
                                ? `${windSpeed}km/h`
                                : 'N/A'}
                        </span>
                    </div>

                    <div>
                        <h4 className="details-square-item__title">
                            Wind Direction
                            <WiWindDeg
                                className="text-2xl"
                                aria-hidden="true"
                            />
                        </h4>
                        <span className="flex justify-center">
                            {windDirection !== undefined
                                ? getWindDirection(windDirection)
                                : 'N/A'}
                        </span>
                    </div>
                </li>
            </ul>

            {sunrise && sunset && (
                <div className="details-item gap-2 sm:w-fit">
                    <span className="flex items-center gap-1">
                        {getDateAndTime(sunrise)[1]}
                        <FiSunrise className="text-xl" aria-hidden="true" />
                    </span>
                    <span
                        className="min-w-[calc(100%-150px)] sm:min-w-28 h-0.5 bg-white/50 mx-1 rounded-sm relative flex items-center"
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
                        <FiSunset className="text-xl" aria-hidden="true" />
                        {getDateAndTime(sunset)[1]}
                    </span>
                </div>
            )}

            <p className="hidden sm:block text-start text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold backdrop-blur-3xl rounded-md overflow-hidden w-max px-2.5">
                {WEATHER_CODES[weatherCode]?.toUpperCase() ?? ''}
            </p>
        </div>
    );
};

export default WeatherDetails;
