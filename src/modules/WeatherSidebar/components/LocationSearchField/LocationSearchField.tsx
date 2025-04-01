import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { MdOutlinePlace, MdClear } from 'react-icons/md';

import useWeatherData, {
    selectFetchWeatherData,
} from '../../../../store/useWeatherData';
import { fetchLocationList } from '../../API/fetchLocationList';
import { capitalizeFirstLetters } from '../../helpers/capitalizeFirstLetters';

interface ILocationItem {
    display_address: string;
    display_place: string;
    place_id: string;
}

type TAPIResponse = ILocationItem[];

const LocationSearchField = () => {
    const [searchValue, setSearchValue] = useState('');
    const [locationList, setLocationList] = useState<ILocationItem[] | null>(
        null
    );
    const [error, setError] = useState('');
    const API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY;
    const fetchWeatherData = useWeatherData(selectFetchWeatherData);

    if (!API_KEY) {
        console.error('Geolocation API key is missing!');
        return null;
    }

    useEffect(() => {
        setLocationList(null);
        setError('');
        if (!searchValue) return;

        const debounceFetchId = setTimeout(async () => {
            const data: TAPIResponse | string = await fetchLocationList(
                API_KEY,
                searchValue
            );
            if (typeof data === 'string') {
                setError(data);
            } else {
                setLocationList(data);
            }
        }, 500);

        return () => {
            clearTimeout(debounceFetchId);
        };
    }, [searchValue]);

    const handleFetchWeatherData = (location: string) => {
        fetchWeatherData(location);
        setLocationList(null);
        setSearchValue('');
    };

    const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchWeatherData(capitalizeFirstLetters(searchValue));
    };

    const handleClearSearchField = () => {
        setSearchValue('');
        setLocationList(null);
        setError('');
    };

    const locationListRender = () => {
        return locationList?.map((item) => {
            const { display_place, display_address, place_id } = item;

            return (
                <li
                    className="shadow-md hover:shadow-blue-500/60 rounded-md p-0.5 transition duration-500"
                    key={place_id}
                >
                    <button
                        className="cursor-pointer block w-full"
                        onClick={() => handleFetchWeatherData(display_place)}
                        aria-label={`Fetch weather data for ${display_place}`}
                    >
                        <p className="text-sm font-bold truncate">
                            {display_place}
                        </p>
                        <p className="text-xs text-gray/80 truncate">
                            {display_address}
                        </p>
                    </button>
                </li>
            );
        });
    };

    return (
        <form className="group" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <MdOutlinePlace className="absolute left-9 text-lg" />
                <input
                    className="pl-5 pr-12 py-0.5 w-full focus:outline-0 placeholder:text-xs ml-0.5"
                    type="text"
                    placeholder="Enter your location"
                    aria-placeholder="Enter your location"
                    value={searchValue}
                    onChange={handleSearchValue}
                />
                {searchValue && (
                    <span
                        className="absolute right-6 text-xl text-blue-500 active:-scale-90 cursor-pointer transition-transform duration-300"
                        onClick={handleClearSearchField}
                    >
                        <MdClear />
                    </span>
                )}
                <RiSearch2Line className="absolute right-0.5" />
            </div>
            {error ? (
                <p className="text-red-400 text-center absolute bg-white/95 rounded-b-sm p-2 left-0 max-w-[230px] right-0">
                    {error}
                </p>
            ) : (
                locationList &&
                searchValue && (
                    <ul className="absolute w-full opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible flex flex-col gap-3 px-1.5 py-2.5 rounded-b-sm bg-white/95 text-gray-500 transition-all duration-400 sm:max-w-[230px] mx-auto left-0 z-30">
                        {locationListRender()}
                    </ul>
                )
            )}
        </form>
    );
};
export default LocationSearchField;
