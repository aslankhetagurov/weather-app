import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { MdOutlinePlace } from 'react-icons/md';
import { MdClear } from 'react-icons/md';

import useWeatherData, {
    selectFetchWeatherData,
} from '../../../../store/useWeatherData';
import { fetchLocationList } from '../../API/FetchLocationList';

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
        fetchWeatherData(searchValue);
    };

    const handleClearSearchField = () => {
        setSearchValue('');
        setLocationList(null);
        setError('');
    };

    const locationListRender = () => {
        return locationList?.map((item) => {
            return (
                <li
                    className="group cursor-pointer shadow-md hover:shadow-blue-500/60 rounded-md p-0.5 transition duration-500"
                    onClick={() => handleFetchWeatherData(item.display_place)}
                    key={item.place_id}
                >
                    <p className="text-sm font-bold group-hover:decoration-blue-500/50 truncate">
                        {item.display_place}
                    </p>
                    <p className="text-xs text-gray/80 truncate">
                        {item.display_address}
                    </p>
                </li>
            );
        });
    };

    return (
        <form className="group relative mx-auto mb-2.5" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <MdOutlinePlace className="absolute left-0.5" />
                <input
                    className="border-b-1 border-white/20 pl-5 pr-12 py-0.5 w-full focus:outline-0"
                    type="text"
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
                <p className="text-red-400 text-center absolute bg-white/95 rounded-b-sm w-full p-2">
                    {error}
                </p>
            ) : (
                locationList &&
                searchValue && (
                    <ul className="absolute opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible flex flex-col gap-3 px-1.5 py-2.5 rounded-b-sm bg-white/95 text-gray-500 transition-all duration-400 max-w-[230px]">
                        {locationListRender()}
                    </ul>
                )
            )}
        </form>
    );
};
export default LocationSearchField;
