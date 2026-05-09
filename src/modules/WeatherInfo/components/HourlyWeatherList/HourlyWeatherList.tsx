import { useEffect, useRef } from 'react';

import useWeatherData, {
    selectWeatherData,
} from '../../../../store/useWeatherData';
import HourlyWeatherItem from '../HourlyWeatherItem/HourlyWeatherItem';

const HourlyWeatherList = () => {
    const weatherData = useWeatherData(selectWeatherData);
    const sliderRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            slider.scrollLeft += e.deltaX ? e.deltaX : e.deltaY;
        };

        slider.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            slider.removeEventListener('wheel', handleWheel);
        };
    }, []);

    if (!weatherData) return null;

    const { hourly } = weatherData;
    const pastHours = new Date(Date.parse(weatherData.current.time)).getHours();

    const hourlyItems = hourly.time
        .slice(pastHours, 24 + pastHours) // always display the next 24 hours starting from the current hour
        .map((time, i) => (
            <HourlyWeatherItem
                key={time + i}
                hourlyData={hourly}
                index={i}
                pastHours={pastHours}
            />
        ));

    return (
        <div className="flex gap-2 mt-7 sm:mt-auto sm:pt-2.5 sm:border-t-1 border-white/40 ">
            <ul
                ref={sliderRef}
                className="flex gap-2 overflow-x-scroll hide-scrollbar cursor-ew-resize"
            >
                {hourlyItems}
            </ul>
        </div>
    );
};

export default HourlyWeatherList;
