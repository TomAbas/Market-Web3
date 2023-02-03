/* eslint-disable @typescript-eslint/no-unused-vars */
import { async } from '@firebase/util';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import axiosClient from 'api/axiosClient';
import sha256 from 'sha256';
import React, { useState } from 'react';
import { loginUser } from './useUserLogin';

declare let window: any;
const SignMessages = () => {
	let publicKey: string;
	let userAddress: string;
	let nonce =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	const { wallet, account } = useWallet();
	const dataMessage = {
		address: false, // set true if you want include current address to message
		application: false, // // set true if you want include current application to message
		chainId: false, // set true if you want include current chain id to message
		message: '', // message like string or Uint8Array
		nonce: nonce, // random nonce like string
	};
	function identifyWallet() {
		console.log(wallet?.adapter.name);
		if (wallet?.adapter.name === 'Pontem') {
			pontemSign();
		} else if (wallet?.adapter.name === 'Spacecy') {
			spacecySign();
		} else if (wallet?.adapter.name === 'Martian') {
			martianSign();
		} else if (wallet?.adapter.name === 'Petra') {
			petraSign();
		}
	}
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
				console.log('Obj sent', objSent);
				loginUser(objSent);
			})
			.catch((e: any) => console.log('Error', e));
	}
	async function spacecySign() {
		await window.spacecy.connect().then((result: any) => {
			console.log('Spacecy sign', result);
			publicKey = result.data.publicKey.startsWith('0x')
				? result.data.publicKey.slice(2)
				: result.data.publicKey;
			userAddress = result.data.address;
			dataMessage.message = sha256(publicKey);
		});
		window.spacecy
			.signMessage(dataMessage)
			.then((result: any) => {
				let objSent = {
					userAddress: userAddress,
					publicKey: publicKey,
					nonce: nonce,
					signature: result.data.signature,
				};
				console.log('Obj sent', objSent);
				loginUser(objSent);
			})
			.catch((e: any) => console.log('Error', e));
	}
	async function martianSign() {
		await window.martian.connect().then((result: any) => {
			publicKey = result.publicKey.startsWith('0x')
				? result.publicKey.slice(2)
				: result.publicKey;
			dataMessage.message = sha256(publicKey);
			userAddress = result.address;
		});
		window.martian
			.signMessage(dataMessage)
			.then((result: any) => {
				let objSent = {
					userAddress: userAddress,
					publicKey: publicKey,
					nonce: nonce,
					signature: result.signature.startsWith('0x')
						? result.signature.slice(2)
						: result.signature,
				};
				console.log('Result', result);
				console.log('Obj sent', objSent);
				loginUser(objSent);
			})
			.catch((e: any) => console.log('Error', e));
	}
	async function petraSign() {
		await window.aptos.connect().then((result: any) => {
			console.log('Result', result);
			publicKey = result.publicKey.startsWith('0x')
				? result.publicKey.slice(2)
				: result.publicKey;
			dataMessage.message = sha256(publicKey);
		});
		window.petra
			.signMessage(dataMessage)
			.then((result: any) => {
				let objSent = {
					userAddress: result.address,
					publicKey: publicKey,
					nonce: nonce,
					signature: result.signature,
				};
				console.log('Full message', result.fullMessage);
				console.log('Obj sent', objSent);
				loginUser(objSent);
			})
			.catch((e: any) => console.log('Error', e));
	}
	return { identifyWallet };
};

export default SignMessages;
