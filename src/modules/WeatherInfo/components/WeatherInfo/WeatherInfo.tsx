import CurrentDateAndTime from '../CurrentDateAndTime/CurrentDateAndTime';
import HourlyWeatherList from '../HourlyWeatherList/HourlyWeatherList';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

export const WeatherInfo = () => {
    return (
        <div className="w-full p-5 flex flex-col overflow-hidden">
            <CurrentDateAndTime />
            <WeatherDetails />
            <HourlyWeatherList />
        </div>
    );
};
