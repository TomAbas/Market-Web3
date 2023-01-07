import React, { ReactNode } from 'react';
import useAccountGuard from 'hooks/useAccountGuard';
interface Props {
	children: ReactNode | string;
}

const AccountGuard: React.FC<Props> = ({ children }) => {
	useAccountGuard();
	return <>{children}</>;
};

export default AccountGuard;
