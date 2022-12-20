import numeral from 'numeral';
export const formatNumber = (
	amount: string,
	minNumberLimitAfterComma: number,
	maxNumberLimitAfterComma: number
) => {
	if (maxNumberLimitAfterComma) {
		return numeral(amount).format(
			`0,0.${'0'.repeat(minNumberLimitAfterComma)}[${'0'.repeat(
				maxNumberLimitAfterComma - minNumberLimitAfterComma
			)}]`
		);
	} else {
		return numeral(amount).format(`0,0.${'0'.repeat(minNumberLimitAfterComma)}`);
	}
};
