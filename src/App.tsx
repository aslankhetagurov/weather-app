import { useEffect } from 'react';

import useWeatherData, {
    selectFetchWeatherData,
    selectGetSavedLocations,
    selectWeatherData,
    selectWeatherError,
    selectWeatherLoading,
} from './store/useWeatherData';
import MainPage from './pages/MainPage';
import Spinner from './UI/Spinner';
import { selectBackgroundImage } from './helpers/selectBackgroundImage';
import ErrorComp from './components/ErrorComp/ErrorComp';
import './App.css';

function App() {
    const weatherData = useWeatherData(selectWeatherData);
    const loading = useWeatherData(selectWeatherLoading);
    const fetchWeatherData = useWeatherData(selectFetchWeatherData);
    const getSavedLocations = useWeatherData(selectGetSavedLocations);
    const error = useWeatherData(selectWeatherError);

    useEffect(() => {
        const lastLocation = localStorage.getItem('lastLocation');
        const savedLocations: string[] = JSON.parse(
            localStorage.getItem('locations') || '[]'
        );
        lastLocation && savedLocations.includes(lastLocation)
            ? fetchWeatherData(lastLocation)
            : fetchWeatherData();
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
            ) : error ? (
                <ErrorComp error={error} />
            ) : (
                <div className="app">
                    <div className="w-full h-full sm:h-[calc(100vh-48px)] sm:w-[calc(100%-48px)] md:h-[calc(100vh-100px)] md:w-[calc(100%-100px)] sm:rounded-2xl sm:border-white/10 sm:shadow-[0_0_100px_rgba(255,255,255,0.95)]">
                        <MainPage />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
