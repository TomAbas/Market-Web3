import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ children }: any) {
	const { pathname } = useLocation();

	useEffect(() => {
		// console.log('scroll!!!!!');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	return <>{children}</>;
}
