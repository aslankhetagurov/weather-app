import { useEffect } from 'react';

import useWeatherData, {
    selectFetchWeatherData,
    selectGetSavedLocations,
    selectWeatherData,
    selectWeatherLoading,
} from './store/useWeatherData';
import MainPage from './pages/MainPage';
import Spinner from './UI/Spinner';
import { selectBackgroundImage } from './helpers/selectBackgroundImage';
import './App.css';

function App() {
    const weatherData = useWeatherData(selectWeatherData);
    const loading = useWeatherData(selectWeatherLoading);
    const fetchWeatherData = useWeatherData(selectFetchWeatherData);
    const getSavedLocations = useWeatherData(selectGetSavedLocations);

    useEffect(() => {
        fetchWeatherData();
        getSavedLocations();
    }, []);

    const weatherCode = weatherData?.current?.weather_code ?? 0;
    const isDay = weatherData?.current?.is_day ?? 1;
    const backgroundImg = selectBackgroundImage(weatherCode, isDay);

    return (
        <div
            style={{
                backgroundImage: `url(/assets/weatherImages/${backgroundImg})`,
            }}
            className="bg-cover bg-no-repeat min-h-screen"
            role="img"
            aria-label="Background showing weather"
        >
            {loading ? (
                <Spinner />
            ) : (
                <div className="app">
                    <div className="m-10 h-[calc(100vh-100px)] w-[calc(100%-100px)]  rounded-2xl border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.95)]">
                        <MainPage />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
