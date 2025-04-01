import CurrentDateAndTime from '../CurrentDateAndTime/CurrentDateAndTime';
import HourlyWeatherList from '../HourlyWeatherList/HourlyWeatherList';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

export const WeatherInfo = () => {
    return (
        <div className="hidden sm:flex flex-col w-full p-5 overflow-hidden">
            <CurrentDateAndTime />
            <WeatherDetails />
            <HourlyWeatherList />
        </div>
    );
};
