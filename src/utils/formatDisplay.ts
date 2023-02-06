export const displayAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const displayVolume = (
	volume: number,
	minNumberLimitAfterComma: number,
	minValue: number = 0.005
) => {
	return volume > minValue ? volume.toFixed(minNumberLimitAfterComma) : volume;
};
