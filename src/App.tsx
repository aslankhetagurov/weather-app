import { useEffect } from 'react';

import useWeatherData, {
    selectFetchWeatherData,
    selectWeatherData,
    selectWeatherLoading,
} from './store/useWeatherData';
import MainPage from './pages/MainPage';
import Spinner from './UI/Spinner';
import { selectBackgroundImage } from './helpers/selectBackgroundImage';
import './App.css';

function App() {
    useEffect(() => {
        fetchWeatherData();
    }, []);

    const weatherData = useWeatherData(selectWeatherData);
    const fetchWeatherData = useWeatherData(selectFetchWeatherData);
    const loading = useWeatherData(selectWeatherLoading);

    const weatherCode = weatherData?.current?.weather_code ?? 0;
    const isDay = weatherData?.current?.is_day ?? 1;
    const backgroundImg = selectBackgroundImage(weatherCode, isDay);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div
                    style={{
                        backgroundImage: `url(/assets/weatherImages/${backgroundImg})`,
                    }}
                    className="app bg-cover bg-no-repeat min-h-screen"
                    role="img"
                    aria-label="Background showing weather"
                >
                    <div className="m-10 h-[calc(100vh-100px)] w-[calc(100vw-100px)] rounded-2xl border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.95)]">
                        <MainPage />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
