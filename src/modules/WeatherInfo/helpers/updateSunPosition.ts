import { RefObject } from 'react';

export const updateSunPosition = (
    sunLineRef: RefObject<HTMLSpanElement | null>,
    sunIconRef: RefObject<HTMLSpanElement | null>,
    sunrise: string,
    sunset: string,
    timeZone: string
) => {
    if (!sunIconRef.current || !sunLineRef.current) return;

    const sunriseTs = Date.parse(sunrise);
    const sunsetTs = Date.parse(sunset);
    const currentTs = Date.parse(
        new Date().toLocaleString('en-US', { timeZone })
    );

    const dayDurationMs = sunsetTs - sunriseTs;
    const elapsedDayTimeMs = currentTs - sunriseTs;

    const sunProgressPercentage = Math.round(
        (elapsedDayTimeMs / dayDurationMs) * 100
    );
    const sunProgressPercentageMAX =
        sunProgressPercentage > 100 ? 100 : sunProgressPercentage;

    sunLineRef.current.style.background = `linear-gradient(to right, white -15%, gold ${sunProgressPercentageMAX}%, white ${sunProgressPercentageMAX}%)`;

    sunProgressPercentageMAX < 0
        ? (sunIconRef.current.style.display = 'none')
        : (sunIconRef.current.style.left = `calc(${sunProgressPercentageMAX}% - 12px)`);
};
