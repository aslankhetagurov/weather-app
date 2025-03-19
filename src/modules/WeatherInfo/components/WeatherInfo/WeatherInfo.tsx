import CurrentDateAndTime from '../CurrentDateAndTime/CurrentDateAndTime';
import HourlyWeatherList from '../HourlyWeatherList/HourlyWeatherList';

export const WeatherInfo = () => {
    return (
        <div className="w-full p-5 flex flex-col overflow-hidden">
            <CurrentDateAndTime />
            <HourlyWeatherList />
        </div>
    );
};
