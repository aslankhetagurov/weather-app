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
    if (!weatherData) return null;

    const { current, daily } = weatherData;

    const humidity = current.relative_humidity_2m;
    const windDirection = current.wind_direction_10m;
    const windSpeed = current.wind_speed_10m;
    const weatherCode = current.weather_code;
    const pressure = current.surface_pressure;
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
        <div className="h-full py-2.5 flex flex-col gap-3 font-bold">
            <div className="grid grid-cols-[120px_120px] grid-rows-[120px_120px] gap-2.5">
                <div className="details-square-item">
                    <h6 className="details-square-item__title">
                        Humidity
                        <WiHumidity className="text-2xl" />
                    </h6>
                    <span className="text-4xl">{humidity}%</span>
                </div>

                <div className="details-square-item ">
                    <h6 className="details-square-item__title">
                        UVMax
                        <TbUvIndex className="text-2xl" />
                    </h6>
                    <span className="text-3xl">{getUVLevel(uv)}</span>
                </div>

                <div className="details-square-item">
                    <h6 className="details-square-item__title py-1">
                        Surface Pressure
                    </h6>
                    <span className="text-2xl">{Math.round(pressure)}hPa</span>
                </div>

                <div className="details-square-item">
                    <div className="mb-1.5">
                        <h6 className="details-square-item__title">
                            Wind Speed
                            <FiWind className="text-2xl" />
                        </h6>
                        <span className="flex justify-center">
                            {windSpeed}km/h
                        </span>
                    </div>

                    <div>
                        <h6 className="details-square-item__title">
                            Wind Direct
                            <WiWindDeg className="text-2xl" />
                        </h6>
                        <span className="flex justify-center">
                            {getWindDirection(windDirection)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="details-item gap-2">
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
            </div>

            <p className="text-start text-5xl font-bold backdrop-blur-3xl backdrop-brightness-99 bg-[#ffffff40] rounded-md overflow-hidden w-max px-2.5">
                {WEATHER_CODES[weatherCode].toUpperCase()}
            </p>
        </div>
    );
};

export default WeatherDetails;
