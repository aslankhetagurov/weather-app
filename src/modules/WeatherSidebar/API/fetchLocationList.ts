export const fetchLocationList = async (
    API_KEY: string,
    searchValue: string
) => {
    try {
        const response = await fetch(
            `https://api.locationiq.com/v1/autocomplete?tag=place%3Acity%2Cplace%3Atown%2Cplace%3Avillage&key=${API_KEY}&q=${searchValue}&limit=5&dedupe=1&accept-language=en&normalizecity=1`
        );
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Nothing was found.`);
            } else {
                throw new Error(
                    `Error: ${response.status}, ${response.statusText}. Unable to get location data.`
                );
            }
        }

        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return err.message;
        }
    }
};
