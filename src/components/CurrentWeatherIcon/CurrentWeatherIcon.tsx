import { TWeatherCode } from '../../types/TWeatherCode';
import selectWeatherIcon from './helpers/selectWeatherIcon';

type TCurrentWeatherIconProps = {
    weatherCode: TWeatherCode;
    styles?: string;
};

const CurrentWeatherIcon = ({
    weatherCode,
    styles,
}: TCurrentWeatherIconProps) => {
    return (
        <span
            className={`w-8 h-8 min-w-8 rounded-sm bg-white/10 flex justify-center items-center text-[18px] ${styles}`}
        >
            {selectWeatherIcon(weatherCode)}
        </span>
    );
};

export default CurrentWeatherIcon;
