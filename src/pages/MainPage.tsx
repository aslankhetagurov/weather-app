import { WeatherSidebar } from '../modules/WeatherSidebar';
import { WeatherInfo } from '../modules/WeatherInfo';

const MainPage = () => {
    return (
        <main className="h-full sm:flex">
            <WeatherSidebar />
            <WeatherInfo />
        </main>
    );
};

export default MainPage;
