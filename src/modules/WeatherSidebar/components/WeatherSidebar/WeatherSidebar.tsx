import logo from '../../../../assets/logo.png';
import CurrentDayTemp from '../CurrentDayTemp/CurrentDayTemp';
import DailyWeatherList from '../DailyWeatherList/DailyWeatherList';
import LocationSearchField from '../LocationSearchField/LocationSearchField';
import SavedLocationsList from '../SavedLocationsList/SavedLocationsList';

export const WeatherSidebar = () => {
    return (
        <section className="min-w-68 max-w-68 backdrop-blur-lg h-full border-1 rounded-2xl border-white/30 px-5 py-1">
            <header className="flex max-w-9/10 mx-auto">
                <img
                    className="mb-2.5 max-w-18"
                    src={logo}
                    alt="Weather app logo"
                />
                <h1 className="font-bold text-3xl self-center">Weathery</h1>
            </header>
            <div className="gap-2.5 flex items-center relative border-b-1 border-white/20 mb-1">
                <SavedLocationsList />
                <LocationSearchField />
            </div>
            <CurrentDayTemp />
            <DailyWeatherList />
        </section>
    );
};
