import { ReactNode } from 'react';

// styled
import { ButtonStyled } from './styles';

export interface ButtonProps {
	children: ReactNode;
	onClick?: any;
	type?: 'button' | 'submit' | 'reset' | undefined;
	sx?: object;
	disabled?: boolean;
}

function ButtonWhite({ children, onClick, type, sx, disabled = false }: ButtonProps) {
	return (
		<ButtonStyled sx={sx} type={type} onClick={onClick} disabled={disabled}>
			{children}
		</ButtonStyled>
	);
}

export default ButtonWhite;
