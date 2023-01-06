/* eslint-disable @typescript-eslint/no-unused-vars */
// styled
import {
	CardContent,
	CardDetail,
	CardHeader,
	CardHeaderInner,
	CardTitle,
	ContentWrap,
	FormButton,
	FormEmail,
	FormWrap,
	Header,
	InfoWrap,
	InputForm,
	Section,
} from './styled';
// images
// import Earth from 'assets/images/planets/earth.svg';
// import Mars from 'assets/images/planets/mars.svg';
// import Neptune from 'assets/images/planets/neptune.svg';
// import Saturn from 'assets/images/planets/saturn.svg';

//
import Wallet from '../../../assets/images/planets/icon-wallet-help.svg';
import Collection from '../../../assets/images/planets/icon-collection-help.svg';
import NFTs from '../../../assets/images/planets/icon-nft-help.svg';
import Tag from '../../../assets/images/planets/icon-tag-help.svg';

const listTutorial = [
	{
		id: 1,
		title: '1. Set Up Your Wallet',
		description:
			'Once you’ve set up your wallet of choice, connect it to Metaspacecy and click the NFT Marketplace in the top right corner.',
		image: Wallet,
		link: '',
	},
	{
		id: 2,
		title: '2. Create Your Collection',
		description:
			'Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
		image: Collection,
		link: '',
	},
	{
		id: 3,
		title: '3. Add Your NFTs',
		description:
			'Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties and stats',
		image: NFTs,
		link: '',
	},
	{
		id: 4,
		title: '4. List Them For Sale',
		description:
			'Choose between auctions, fixed-price listings, and falling-price listings. You choose how you want to sell your NFTs!',
		image: Tag,
		link: '',
	},
];
const Newsletter: React.FC = () => {
	return (
		<Section>
			<div>
				<ContentWrap style={{ fontStyle: 'italic' }}>
					{listTutorial.map((item: any, index: number) => (
						<CardContent key={index}>
							<CardHeader className="card-header">
								<CardHeaderInner
									className="card-header-inner"
									href={item.link}
									target="_blank"
									rel="noreferrer"
								>
									<img
										src={item.image}
										width="20"
										height="20"
										alt={item.title}
									></img>
								</CardHeaderInner>
							</CardHeader>
							<a href={item.link} rel="noreferrer" target="_blank">
								<CardTitle>{item.title}</CardTitle>
							</a>

							<CardDetail>{item.description}</CardDetail>
						</CardContent>
					))}
				</ContentWrap>
				{/* <InfoWrap>
					Join our mailing list to stay in the loop with our newest feature releases, NFT
					drops, and tips and tricks for navigating Xhibiter
				</InfoWrap>
				<FormWrap>
					<FormEmail>
						<InputForm type="email" placeholder="Email Address" />
						<FormButton>Subcribe</FormButton>
					</FormEmail>
				</FormWrap> */}
			</div>
		</Section>
	);
};

export default Newsletter;
