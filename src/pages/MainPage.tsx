import { WeatherSidebar } from '../modules/WeatherSidebar';
import { WeatherInfo } from '../modules/WeatherInfo';

const MainPage = () => {
    return (
        <div className="h-full flex">
            <WeatherSidebar />
            <WeatherInfo />
        </div>
    );
};

export default MainPage;
