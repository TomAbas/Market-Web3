import Marketplace from 'components/Marketplace';
import FooterComp from '../components/FooterComp';
import Header from '../components/Header';
// import ModalInfo from '../components/Header/popupInfoModal';

export default function Home() {
	return (
		<>
			<Header />
			<Marketplace />
			<FooterComp />
		</>
	);
}
