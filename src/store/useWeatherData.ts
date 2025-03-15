import { create } from 'zustand';
import { TWeatherCode } from '../types/TWeatherCode';
const API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY;

export type TIsDay = 0 | 1;

interface ICurrentWeather {
    apparent_temperature: number;
    cloud_cover: number;
    is_day: TIsDay;
    relative_humidity_2m: number;
    temperature_2m: number;
    time: string;
    weather_code: TWeatherCode;
    wind_direction_10m: number;
    wind_speed_10m: number;
}

interface IDailyWeather {
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    uv_index_max: number[];
    weather_code: TWeatherCode[];
}

interface IHourlyWeather {
    precipitation: number[][];
    precipitation_probability: number[][];
    temperature_2m: number[][];
    time: string[][];
    uv_index: number[][];
    weather_code: TWeatherCode[][];
}

export interface IWeather {
    current: ICurrentWeather;
    daily: IDailyWeather;
    hourly: IHourlyWeather;
}

interface ILocationLatAndLon {
    lon: number;
    lat: number;
}

interface ILocationName {
    address: {
        city?: string;
        town?: string;
        village?: string;
        county: string;
    };
}

interface IWeatherStore {
    weatherData: IWeather | null;
    loading: boolean;
    error: string | null;
    locationName: string | null;
    fetchWeatherData: (location?: string) => Promise<void>;
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
    lat: number,
    lon: number
): Promise<IWeather> => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_probability_max&timezone=auto`
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

const getLocationName = async (lat: number, lon: number): Promise<string> => {
    const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${API_KEY}=${lat}&lon=${lon}&format=json&accept-language=en`
    );

    if (!response.ok) {
        throw new Error(
            `HTTP error! status: ${response.status} ${response.statusText}. Failed to get location name`
        );
    }

    const locationData: ILocationName = await response.json();

    return (
        locationData.address.city ||
        locationData.address.town ||
        locationData.address.village ||
        locationData.address.county
    );
};

const useWeatherData = create<IWeatherStore>((set) => ({
    weatherData: null,
    loading: false,
    error: null,
    locationName: null,
    fetchWeatherData: async (location: string | undefined) => {
        set({ loading: true, error: null });

        try {
            if (location) {
                const response = await fetch(
                    `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${location}&format=json&`
                );

                if (!response.ok) {
                    throw new Error(
                        `Weather API error: ${response.status} ${response.statusText}. Unable to determine location`
                    );
                }

                const locationLatAndLon: ILocationLatAndLon[] =
                    await response.json();

                if (!locationLatAndLon || !locationLatAndLon.length)
                    throw new Error(
                        'Location not found. Please check the location name.'
                    );

                const { lat, lon } = locationLatAndLon[0];

                const weatherData = await fetchWeatherDataByCoords(lat, lon);

                set({
                    loading: false,
                    weatherData,
                    locationName: location,
                });
            } else if (navigator.geolocation) {
                try {
                    const geoData = await getCurrentPosition();

                    const { latitude, longitude } = geoData.coords;

                    const locationName = await getLocationName(
                        latitude,
                        longitude
                    );

                    const weatherData = await fetchWeatherDataByCoords(
                        latitude,
                        longitude
                    );

                    set({ loading: false, weatherData, locationName });
                } catch (error) {
                    if (error instanceof GeolocationPositionError) {
                        geolocationError(error, set);
                    } else {
                        throw error;
                    }
                }
            } else {
                throw new Error(
                    'Unable to determine your location. Enter your location in the search field.'
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
export const selectWeatherLocationName = (state: IWeatherStore) =>
    state.locationName;

export default useWeatherData;
