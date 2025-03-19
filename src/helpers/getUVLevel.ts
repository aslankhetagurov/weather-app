export const getUVLevel = (uv: number) => {
    if (!Number.isFinite(uv) || uv < 0) return 'Unknown';
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
};
