const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-cover bg-right-top">
            <div className="relative mb-8 flex items-center justify-center">
                <img
                    className="max-w-28 mt-3.5"
                    src="/logo.png"
                    alt="Weathery app logo"
                    fetchPriority="high"
                    decoding="async"
                    loading="eager"
                    width={90}
                    height={50}
                />

                <div className="h-28 w-28 border-2 rounded-full border-y-[#2eadc4] absolute animate-spin"></div>
            </div>
            <p className="font-bold">Loading, please wait...</p>
        </div>
    );
};

export default Spinner;
