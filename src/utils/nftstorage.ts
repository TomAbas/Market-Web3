import { NFTStorage } from 'nft.storage';
import mime from 'mime';
import path from 'path';
import axios from 'axios';

const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;

export class NFTStorageClient {
	private nftStorage: NFTStorage;

	constructor(token: string) {
		this.nftStorage = new NFTStorage({ token });
	}

	private async fileFromPath(file: string | File) {
		if (file instanceof File) return file;
		const type = mime.getType(file)!;
		return new File([file], path.basename(file), { type });
	}

	private convertGatewayURL(ipfsURL: string) {
		if (ipfsURL.startsWith('ipfs:'))
			return 'https://nftstorage.link/ipfs/' + new URL(ipfsURL).pathname.replace(/^\/\//, '');
		return ipfsURL;
	}

	async upload(file: string | File, name: string, description: string) {
		const image = await this.fileFromPath(file);
		let data = await this.nftStorage.store({ image, name, description });
		return data;
	}

	async getImageURL(tokenURL: string) {
		let gatewayURL = this.convertGatewayURL(tokenURL);
		let image = (await axios.get(gatewayURL)).data.image;
		return this.convertGatewayURL(image);
	}
}

export const nftStorage = new NFTStorageClient(NFT_STORAGE_KEY!);
