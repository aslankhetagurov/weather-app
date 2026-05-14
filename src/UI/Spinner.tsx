const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative flex items-center justify-center">
                <img
                    className="max-w-28 mt-3.5"
                    src="/logo.webp"
                    alt="Weathery app logo"
                    fetchPriority="high"
                    decoding="async"
                    loading="eager"
                    width={90}
                    height={50}
                />

                <div className="h-28 w-28 border-2 rounded-full border-x-[#497ec3] absolute animate-spin" />
            </div>
        </div>
    );
};
export default Spinner;
