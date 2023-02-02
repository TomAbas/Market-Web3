// import useSignMessages from 'hooks/useSignMessages';
import React, { ReactNode } from 'react';
interface Props {
	children: ReactNode | string;
}
const AccountSign: React.FC<Props> = ({ children }) => {
	// const { identifyWallet } = useSignMessages();
	// identifyWallet();
	return <>{children}</>;
};

export default AccountSign;
