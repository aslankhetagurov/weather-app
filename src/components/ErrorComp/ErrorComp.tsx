import { TbFaceIdError } from 'react-icons/tb';

import logo from '../../assets/logo.png';

const ErrorComp = ({ error }: { error: string }) => {
    return (
        <div className="flex flex-col items-center pt-15 h-screen bg-[url(assets/weatherImages/sunny.webp)] bg-no-repeat bg-cover bg-right-top">
            <img
                className="max-w-28 mb-2.5"
                src={logo}
                alt="Weathery app logo"
            />
            <TbFaceIdError className="size-15 mb-2.5" />
            <p className="font-bold" role="alert" aria-live="assertive">
                {error}
            </p>
        </div>
    );
};

export default ErrorComp;
