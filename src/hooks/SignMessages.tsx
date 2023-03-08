/* eslint-disable @typescript-eslint/no-unused-vars */
import { logOutUserSuccessA } from 'redux/slices/userInfo';
import { dispatch } from 'redux/store';
import sha256 from 'sha256';
import { loginUser } from '../api/userApi';
// import useLogin from './useLogin';
// import { dispatch } from 'redux/store';
// import { getUserSuccessA } from 'redux/slices/userInfo';
declare let window: any;
const SignMessagesFc = () => {
	let publicKey: string;
	let userAddress: string;
	let nonce =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	const dataMessage = {
		address: false, // set true if you want include current address to message
		application: false, // // set true if you want include current application to message
		chainId: false, // set true if you want include current chain id to message
		message: '', // message like string or Uint8Array
		nonce: nonce, // random nonce like string
	};

	function identifyWallet() {
		let wallet = localStorage.getItem('wallet');

		if (wallet === 'Pontem') {
			pontemSign();
		} else if (wallet === 'Spacecy') {
			spacecySign();
		} else if (wallet === 'Martian') {
			martianSign();
		} else if (wallet === 'Petra') {
			petraSign();
		}
	}
	identifyWallet();
	async function pontemSign() {
		await window.pontem.connect().then((result: any) => {
			publicKey = result.publicKey.startsWith('0x')
				? result.publicKey.slice(2)
				: result.publicKey;
			dataMessage.message = sha256(publicKey);
			userAddress = result.address;
		});
		window.pontem
			.signMessage(dataMessage)
			.then((result: any) => {
				let objSent = {
					userAddress: userAddress,
					publicKey: publicKey,
					nonce: nonce,
					signature: result.result.signature.startsWith('0x')
						? result.result.signature.slice(2)
						: result.result.signature,
				};
				loginUser(objSent);
			})
			.catch((error: any) => {
				dispatch(logOutUserSuccessA());
			});
	}
	async function spacecySign() {
		await window.spacecy.connect().then((result: any) => {
			publicKey = result.data.publicKey.startsWith('0x')
				? result.data.publicKey.slice(2)
				: result.data.publicKey;
			userAddress = result.data.address;
			dataMessage.message = sha256(publicKey);
		});
		window.spacecy.signMessage(dataMessage).then((result: any) => {
			let objSent = {
				userAddress: userAddress,
				publicKey: publicKey,
				nonce: nonce,
				signature: result.data.signature,
			};
			loginUser(objSent);
		});
	}
	async function martianSign() {
		await window.martian.connect().then((result: any) => {
			publicKey = result.publicKey.startsWith('0x')
				? result.publicKey.slice(2)
				: result.publicKey;
			dataMessage.message = sha256(publicKey);
			userAddress = result.address;
		});
		window.martian.signMessage(dataMessage).then((result: any) => {
			let objSent = {
				userAddress: userAddress,
				publicKey: publicKey,
				nonce: nonce,
				signature: result.signature.startsWith('0x')
					? result.signature.slice(2)
					: result.signature,
			};
			loginUser(objSent);
		});
	}
	async function petraSign() {
		await window.aptos.connect().then((result: any) => {
			publicKey = result.publicKey.startsWith('0x')
				? result.publicKey.slice(2)
				: result.publicKey;
			dataMessage.message = sha256(publicKey);
		});
		window.petra.signMessage(dataMessage).then((result: any) => {
			let objSent = {
				userAddress: result.address,
				publicKey: publicKey,
				nonce: nonce,
				signature: result.signature,
			};
			loginUser(objSent);
		});
	}
};

export default SignMessagesFc;
