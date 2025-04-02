import logo from '../assets/logo.png';
import { ImSpinner9 } from 'react-icons/im';

const Spinner = () => {
    return (
        <div className="flex flex-col items-center pt-15 h-screen bg-[url(assets/weatherImages/sunny.webp)] bg-no-repeat bg-cover bg-right-top">
            <img className="max-w-28 mb-2.5" src={logo} alt="Weathery logo" />
            <ImSpinner9 className="animate-spin size-7 mb-2.5" />
            <p className="font-bold">Loading, please wait...</p>
        </div>
    );
};

export default Spinner;
