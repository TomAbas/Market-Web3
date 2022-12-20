import Web3 from 'web3';

export function getWeb3Contract(abi: any, address: any) {
	const web3 = new Web3(Web3.givenProvider);
	const contract = new web3.eth.Contract(abi, address);
	return contract;
}

export function getAlchemyWeb3Contract(abi: any, address: any) {
	const provider = new Web3.providers.WebsocketProvider(
		'wss://eth-rinkeby.alchemyapi.io/v2/_33XOhKEuJWsFelOo-YqJLE6D9G0-0jS'
	);

	var web3Provider = new Web3(provider);

	const contract = new web3Provider.eth.Contract(abi, address);
	return contract;
}
