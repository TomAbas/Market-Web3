/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useEffect } from 'react';
interface Props {
	children: ReactNode | string;
}
const AccountSign: React.FC<Props> = ({ children }) => {
	return <>{children}</>;
};

export default AccountSign;
