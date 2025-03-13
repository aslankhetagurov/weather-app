import { v4 as uuidv4 } from 'uuid';

import DailyWeatherItem from '../DailyWeatherItem/DailyWeatherItem';
import useWeatherData, {
    selectWeatherData,
} from '../../../../store/useWeatherData';

const DailyWeatherList = () => {
    const weatherData = useWeatherData(selectWeatherData);

    const renderDailyList = () => {
        return weatherData?.daily.weather_code.map((_, i) => (
            <DailyWeatherItem
                key={uuidv4()}
                index={i}
                weatherData={weatherData}
            />
        ));
    };

    return (
        weatherData && (
            <div>
                <h2 className="mt-5 mb-4 font-bold">
                    The Next 7 Days Forecast
                </h2>
                <ul className="flex flex-col gap-y-2.5 text-[13px]">
                    {renderDailyList()}
                </ul>
            </div>
        )
    );
};

export default DailyWeatherList;
