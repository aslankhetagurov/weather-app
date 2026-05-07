import { FaStar } from 'react-icons/fa';

import useWeatherData, {
    selectSavedLocations,
    selectSetAddOrRemoveLocation,
    selectWeatherData,
    selectWeatherLocationName,
} from '../../../../store/useWeatherData';
import { formatTemp } from '../../../../helpers/formatTemp';
import { WEATHER_CODES } from '../../../../consts/weatherCodes';

const CurrentDayTemp = () => {
    const weatherData = useWeatherData(selectWeatherData);
    const locationName = useWeatherData(selectWeatherLocationName);
    const savedLocations = useWeatherData(selectSavedLocations);
    const setAddOrRemoveLocation = useWeatherData(selectSetAddOrRemoveLocation);

    if (!weatherData || !locationName) return null;

    const {
        temperature_2m: currentTemp,
        apparent_temperature: feelsLike,
        weather_code: weatherCode,
    } = weatherData.current;
    const { temperature_2m_min: minTemp, temperature_2m_max: maxTemp } =
        weatherData.daily;

    const isFavorite = (locationName: string) =>
        savedLocations.includes(locationName);

    const handleAddOrRemoveNewLocation = () => {
        locationName && setAddOrRemoveLocation(locationName);
    };

    return (
        <div className="border-b-1 border-white/20 py-3.5 sm:py-0 sm:pb-1.5">
            <p className="block sm:hidden text-2xl px-2.5 text-center text-gray-200">
                {WEATHER_CODES[weatherCode].toUpperCase()}
            </p>
            <div className="flex justify-center mb-2 gap-1">
                <h3 className="text-5xl font-medium">
                    {formatTemp(currentTemp)}
                </h3>
                <div className="text-gray-100 text-[12px] self-end">
                    <p>Real Feel</p>
                    <p>{formatTemp(feelsLike)}</p>
                </div>
            </div>
            <p className="text-gray-100">
                {`${formatTemp(minTemp[0]).match(/.?\d+/g)} ~
                    ${formatTemp(maxTemp[0])}`}
            </p>
            <div className="flex items-center justify-center gap-2 ">
                <button
                    className="active:scale-80 transition-transform duration-300 cursor-pointer"
                    onClick={handleAddOrRemoveNewLocation}
                    aria-label={
                        isFavorite(locationName)
                            ? `Remove ${locationName} from favorite locations`
                            : `Add ${locationName} to favorite locations`
                    }
                >
                    <FaStar
                        className={`text-2xl ${
                            isFavorite(locationName)
                                ? 'text-amber-300'
                                : 'text-white/50'
                        }`}
                    />
                </button>
                <h3
                    className="text-2xl font-bold truncate"
                    role="region"
                    aria-live="polite"
                >
                    {locationName}
                </h3>
            </div>
        </div>
    );
};

export default CurrentDayTemp;
