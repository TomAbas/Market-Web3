import { WalletClient } from '@martiandao/aptos-web3-bip44.js';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const APTOS_FAUCET_URL = process.env.REACT_APP_APTOS_FAUCET_URL;

export const walletClient = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
