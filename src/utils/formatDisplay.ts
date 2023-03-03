export const displayAddress = (address: string | undefined) => {
	if (!address) return null;
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const displayUserName = (userName: any) => {
	const length = Number(userName.length);
	if (length > 20) {
		return `${userName.slice(0, 5)}...${userName.slice(-4)}`;
	}
	return userName;
};

export const displayUserFullName = (userName: string) => {
	if (userName?.length > 20) return userName;
	else return null;
};

export const displayVolume = (
	volume: number,
	minNumberLimitAfterComma: number,
	minValue: number = 0.005
) => {
	return volume > minValue ? volume.toFixed(minNumberLimitAfterComma) : volume;
};
