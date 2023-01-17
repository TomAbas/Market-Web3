import Web3 from 'web3';
declare let window: any;

const SwitchNetwork = async (mainnet: any, newChainId: number) => {
	if (typeof window.ethereum !== 'undefined') {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: Web3.utils.toHex(newChainId) }],
			});
		} catch (switchError: any) {
			if (switchError !== 4001) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: mainnet,
					});
				} catch (error) {}
			}
		}
	}
	return;
};
export default SwitchNetwork;
