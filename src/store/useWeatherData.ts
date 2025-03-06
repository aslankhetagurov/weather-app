import { create } from 'zustand';

interface IWeatherData {
    weather: [
        {
            main: string;
            description: string;
        }
    ];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    name: string;
    timezone: number;
}

interface ICityLonAndLat {
    lon: number;
    lat: number;
}

interface IWeatherStore {
    weatherData: IWeatherData | null;
    loading: boolean;
    error: string | null;
    fetchWeatherData: (city?: string) => Promise<void>;
}

const geolocationError = (
    error: GeolocationPositionError,
    set: (data: {}) => void
): void => {
    let errorMessage: string;

    switch (error.code) {
        case error.TIMEOUT:
            errorMessage =
                'The waiting time for receiving geolocation data has expired. Enter your city in the search field.';
            break;
        case error.PERMISSION_DENIED:
            errorMessage =
                'You have denied access to geolocation. Enter your city in the search box or provide access to geolocation data.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage =
                'Location information is not available.Enter your city in the search field.';
            break;
        default:
            errorMessage =
                'An unknown error has occurred. Enter your city in the search field.';
    }

    set({ loading: false, error: errorMessage });
};

const fetchWeatherDataByCoords = async (
    API_KEY: string,
    lat: number,
    lon: number
): Promise<IWeatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        throw new Error(
            `Weather API error: ${response.status} ${response.statusText}`
        );
    }

    return await response.json();
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const useWeatherData = create<IWeatherStore>((set) => ({
    weatherData: null,
    loading: false,
    error: null,
    fetchWeatherData: async (city: string | undefined) => {
        set({ loading: true, error: null });

        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

        try {
            if (city) {
                const response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error(
                        `Weather API error: ${response.status} ${response.statusText}`
                    );
                }

                const cityLonAndLat: ICityLonAndLat[] = await response.json();

                if (!cityLonAndLat || !cityLonAndLat.length)
                    throw new Error('City not found. Please check the name.');

                const { lat, lon } = cityLonAndLat[0];

                const weatherData = await fetchWeatherDataByCoords(
                    API_KEY,
                    lat,
                    lon
                );

                set({ loading: false, weatherData });
            } else if (navigator.geolocation) {
                try {
                    const geoData = await getCurrentPosition();

                    const { latitude, longitude } = geoData.coords;

                    const weatherData = await fetchWeatherDataByCoords(
                        API_KEY,
                        latitude,
                        longitude
                    );

                    set({ loading: false, weatherData });
                } catch (error) {
                    if (error instanceof GeolocationPositionError) {
                        geolocationError(error, set);
                    } else {
                        throw error;
                    }
                }
            } else {
                throw new Error(
                    'Unable to determine your location. Enter your city in the search field.'
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                set({ loading: false, error: error.message });
            }
        }
    },
}));

export const selectFetchWeatherData = (state: IWeatherStore) =>
    state.fetchWeatherData;
export const selectWeatherData = (state: IWeatherStore) => state.weatherData;
export const selectWeatherLoading = (state: IWeatherStore) => state.loading;
export const selectWeatherError = (state: IWeatherStore) => state.error;

export default useWeatherData;
