import { useEffect, useRef, useState } from 'react';

import { getDateAndTime } from '../../helpers/getDateAndTime';

const CurrentDateAndTime = () => {
    const [dateAndTime, setDateAndTime] = useState<string[]>(getDateAndTime());
    const intervalIdRef = useRef<number | null>(null);

    useEffect(() => {
        const updateTime = () => setDateAndTime(getDateAndTime());
        updateTime();

        const nowSec = new Date().getSeconds();
        const timeoutId = setTimeout(() => {
            updateTime();
            intervalIdRef.current = setInterval(updateTime, 60000);
        }, (60 - nowSec) * 1000);

        return () => {
            timeoutId && clearTimeout(timeoutId);
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, []);

    const [date, time] = dateAndTime;

    return (
        <div className="flex items-center font-bold text-left">
            <span className="pr-2.5 mr-2.5 border-r-1 border-r-gray-300">
                {date}
            </span>
            <span>{time}</span>
        </div>
    );
};

export default CurrentDateAndTime;
