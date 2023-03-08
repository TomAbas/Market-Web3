import { toast } from 'react-toastify';
import { useState } from 'react';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { createEvent as createEventApi } from '../api/eventApi';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
function usePredict() {
	const { signAndSubmitTransaction } = useWallet();
	const [eventData, setEventData] = useState<any>(null);
	async function createEvent() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::prediction::create_event`,
				type_arguments: ['0x1::aptos_coin::AptosCoin'],
				arguments: [
					eventData.description,
					eventData.uri,
					eventData.options,
					eventData.startTime,
					eventData.endTime,
				],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				createEventApi({ ...eventData, txHash: res.hash });
				toast.success(res.hash);
			});
		} catch (error: any) {
			console.error(console.error());
		}
	}
	async function cancelEvent() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::prediction::cancel_event`,
				type_arguments: ['0x1::aptos_coin::AptosCoin'],
				arguments: [eventData.description, eventData.options],
			};
			let txHash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
				(res) => res.hash
			);
			toast.success(txHash);
		} catch (error: any) {
			console.error(console.error());
		}
	}
	async function finalizeEvent() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::prediction::finalize_event`,
				type_arguments: [],
				arguments: [],
			};
			let txHash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
				(res) => res.hash
			);
			toast.success(txHash);
		} catch (error: any) {
			console.error(console.error());
		}
	}
	async function initializePrediction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::prediction::initialize_prediction`,
				type_arguments: [],
				arguments: [],
			};
			let txHash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
				(res) => res.hash
			);
			toast.success(txHash);
		} catch (error: any) {
			console.error(console.error());
		}
	}
	async function predictEvent() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::prediction::predict_event`,
				type_arguments: [],
				arguments: [
					'option',
					'amount',
					'event_creator',
					'event_description',
					'event_options',
				],
			};
			let txHash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
				(res) => res.hash
			);
			toast.success(txHash);
		} catch (error: any) {
			console.error(console.error());
		}
	}

	return {
		createEvent,
		cancelEvent,
		finalizeEvent,
		initializePrediction,
		predictEvent,
		setEventData,
	};
}

export default usePredict;
