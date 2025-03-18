import logo from '../../../../assets/logo.png';
import CurrentDayTemp from '../CurrentDayTemp/CurrentDayTemp';
import DailyWeatherList from '../DailyWeatherList/DailyWeatherList';

export const WeatherSidebar = () => {
    return (
        <section className="min-w-68 max-w-68 backdrop-blur-lg h-full border-1 rounded-2xl border-white/30 p-5">
            <header className="flex max-w-9/10 mx-auto">
                <img
                    className="mb-2.5 max-w-18"
                    src={logo}
                    alt="Weathery logo"
                />
                <h1 className="font-bold text-3xl self-center">Weathery</h1>
            </header>
            <CurrentDayTemp />
            <DailyWeatherList />
        </section>
    );
};
