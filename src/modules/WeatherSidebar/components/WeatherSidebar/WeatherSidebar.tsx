import HourlyWeatherList from '../../../WeatherInfo/components/HourlyWeatherList/HourlyWeatherList';
import WeatherDetails from '../../../WeatherInfo/components/WeatherDetails/WeatherDetails';
import CurrentDayTemp from '../CurrentDayTemp/CurrentDayTemp';
import DailyWeatherList from '../DailyWeatherList/DailyWeatherList';
import LocationSearchField from '../LocationSearchField/LocationSearchField';
import SavedLocationsList from '../SavedLocationsList/SavedLocationsList';

export const WeatherSidebar = () => {
    return (
        <section className="sm:min-w-68 sm:max-w-68 sm:backdrop-blur-lg h-full sm:border-1 sm:rounded-2xl border-white/30 sm:px-5 sm:py-1">
            <header className="flex justify-center max-w-9/10 mx-auto mb-5 sm:mb-0">
                <img
                    className="mb-2.5 max-w-18"
                    src="/logo.webp"
                    alt="Weather app logo"
                    fetchPriority="high"
                    decoding="async"
                    loading="eager"
                    width={72}
                    height={47}
                />
                <h1 className="font-bold text-3xl self-center">Weathery</h1>
            </header>
            <div className="gap-2.5 flex items-center relative border-b-1 border-white/20 mb-1">
                <SavedLocationsList />
                <LocationSearchField />
            </div>
            <CurrentDayTemp />

            <div className="block sm:hidden">
                <HourlyWeatherList />
            </div>

            <DailyWeatherList />

            <div className="block sm:hidden rounded-lg sm:backdrop-blur-none">
                <WeatherDetails />
            </div>
        </section>
    );
};
