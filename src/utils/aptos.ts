import { WalletClient } from '@martiandao/aptos-web3-bip44.js';

const APTOS_NODE_URL = 'https://fullnode.testnet.aptoslabs.com/v1';
const APTOS_FAUCET_URL = 'https://fullnode.testnet.aptoslabs.com/v1';
export const walletClient = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
