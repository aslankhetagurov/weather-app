import { ImSpinner9 } from 'react-icons/im';

import useWeatherData, {
    selectWeatherData,
    selectWeatherError,
    selectWeatherLoading,
    selectWeatherLocationName,
} from '../../../../store/useWeatherData';
import { formatTemp } from '../../../../helpers/formatTemp';

const CurrentDayTemp = () => {
    const weatherData = useWeatherData(selectWeatherData);
    const weatherLoading = useWeatherData(selectWeatherLoading);
    const weatherErrorMessage = useWeatherData(selectWeatherError);
    const locationName = useWeatherData(selectWeatherLocationName);

    if (weatherLoading) {
        return <ImSpinner9 className="animate-spin size-5 my-5 mx-auto " />;
    }

    if (weatherErrorMessage) {
        return <p className="text-red-400 font-bold">{weatherErrorMessage}</p>;
    }

    if (!weatherData) {
        return (
            <p className="text-red-400 font-bold">
                Failed to load temperature data. Please try again later.
            </p>
        );
    }

    const { temperature_2m: currentTemp, apparent_temperature: feelsLike } =
        weatherData.current;
    const { temperature_2m_min: minTemp, temperature_2m_max: maxTemp } =
        weatherData.daily;

    return (
        <div className="border-b-1 border-white/20 pb-1.5">
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
            <h3 className="text-2xl font-bold truncate">{locationName}</h3>
        </div>
    );
};

export default CurrentDayTemp;
