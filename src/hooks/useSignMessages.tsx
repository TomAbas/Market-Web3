/* eslint-disable @typescript-eslint/no-unused-vars */
import { async } from '@firebase/util';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import axiosClient from 'api/axiosClient';
import React, { useState } from 'react';
import { loginUser } from './useUserLogin';

declare let window: any;
const SignMessages = () => {
	let publicKey: string;
	let nonce = 1234;
	const { wallet } = useWallet();
	const dataMessage = {
		address: true, // set true if you want include current address to message
		application: true, // // set true if you want include current application to message
		chainId: false, // set true if you want include current chain id to message
		message: 'Login Marketplace', // message like string or Uint8Array
		nonce: nonce, // random nonce like string
	};
	function identifyWallet() {
		console.log(wallet);
		if (wallet?.adapter.name === 'Pontem') {
			pontemSign();
		} else if (wallet?.adapter.name === 'Spacecy') {
		} else if (wallet?.adapter.name === 'Martian') {
		} else if (wallet?.adapter.name === 'Petra') {
		}
	}
	async function pontemSign() {
		await window.pontem.publicKey().then((key: string) => {
			console.log('Public key: ', key);
			publicKey = key;
		});
		window.pontem
			.signMessage(dataMessage)
			.then((result: any) => {
				console.log('Signed Message', result.result);
				let objSent = {
					userAddress: result.result.address,
					publicKey: publicKey,
					nonce: nonce,
					signature: result.result.signature,
					message: result.result.fullMessage,
				};
				loginUser(objSent);
			})
			.catch((e: any) => console.log('Error', e));
	}
	return { identifyWallet };
};

export default SignMessages;
