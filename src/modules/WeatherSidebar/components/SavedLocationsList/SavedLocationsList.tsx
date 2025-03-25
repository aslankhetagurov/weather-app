import { useState } from 'react';
import { MdFormatListBulletedAdd, MdClear, MdDelete } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

import useWeatherData, {
    selectFetchWeatherData,
    selectSavedLocations,
    selectSetAddOrRemoveLocation,
} from '../../../../store/useWeatherData';

const SavedLocationsList = () => {
    const savedLocations = useWeatherData(selectSavedLocations);
    const setAddOrRemoveLocation = useWeatherData(selectSetAddOrRemoveLocation);
    const fetchWeatherData = useWeatherData(selectFetchWeatherData);
    const [isShowList, setIsShowList] = useState(false);

    const handleShowList = () => {
        setIsShowList(!isShowList);
    };

    const renderLocations = () => {
        return savedLocations.map((location) => {
            return (
                <li
                    key={location}
                    className="w-full relative flex items-center"
                >
                    <button
                        onClick={() => fetchWeatherData(location)}
                        className="shadow-md p-1.5 w-full rounded-md cursor-pointer hover:bg-amber-200/70 active:scale-95 transition duration-300 truncate mr10"
                        aria-label={`Fetch weather data for ${location}`}
                    >
                        {location}
                    </button>
                    <button
                        onClick={() => setAddOrRemoveLocation(location)}
                        className="text-red-400 cursor-pointer active:scale-80 transition-transform duration-300 absolute right-1"
                        aria-label={`Remove ${location} from favorite locations`}
                    >
                        <MdDelete className="text-2xl" />
                    </button>
                </li>
            );
        });
    };

    return (
        <div className="group text-gray-500 rounded-sm self-start">
            <button
                onClick={handleShowList}
                className="text-2xl cursor-pointer bg-white/95 text-gray-500 self-start flex items-center justify-center rounded-t-xs"
                aria-label={
                    isShowList
                        ? 'Hide favorite locations'
                        : 'Show favorite locations'
                }
                aria-expanded={isShowList ? 'true' : 'false'}
            >
                {isShowList ? <MdClear /> : <MdFormatListBulletedAdd />}
            </button>
            <div
                className={`p-2 absolute bg-white/95 w-full opacity-0 invisible transition-all duration-400 rounded-b-sm ${
                    isShowList ? 'opacity-100 visible' : ''
                }`}
                role="region"
                aria-live="polite"
            >
                <h3 className="font-bold mb-2.5 flex gap-1.5 justify-center">
                    <FaStar className="text-amber-300 text-lg" />
                    <span>Favorite Locations</span>
                </h3>
                <ul className="flex flex-col items-center gap-2.5">
                    {renderLocations()}
                </ul>
            </div>
        </div>
    );
};
export default SavedLocationsList;
