import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
//mui
import CloseIcon from '@mui/icons-material/Close';
//styled
import {
	LeftHeader,
	MainHeader,
	ModalClose,
	ModalHeader,
	ModalOverlay,
	ModalStyle,
	WrapperChildren,
} from './styled';
import DividerGradient from '../DividerGradient';
import { useLocation } from 'react-router-dom';
export interface ModalProps {
	children: ReactNode;
	onOpen: boolean;
	onClose?: VoidFunction;
	leftHeader?: string;
	leftHeaderFn?: VoidFunction;
	mainHeader?: string;
	allowClose?: any;
	style?: object;
}

const Modal = ({
	children,
	onOpen,
	onClose,
	leftHeader,
	leftHeaderFn,
	mainHeader,
	allowClose = true,
	style,
}: ModalProps) => {
	const { pathname } = useLocation();
	useEffect(() => {
		if (onOpen) {
			document.body.classList.add('stop-scroll');
		} else {
			document.body.classList.remove('stop-scroll');
		}

		return () => {
			document.body.classList.remove('stop-scroll');
		};
	}, [onOpen]);

	// handle esc to close the modal
	useEffect(() => {
		if (!onClose || !onOpen) return;

		const escFunction = (event: any) => {
			if (event.key === 'Escape') {
				//Do whatever when esc is pressed
				onClose();
				window.removeEventListener('keydown', escFunction);
			}
		};

		window.addEventListener('keydown', escFunction, { passive: true });

		return () => {
			window.removeEventListener('keydown', escFunction);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onOpen]);

	if (!onOpen) {
		return null;
	}

	const portalRoot = document.getElementById('portal-root');

	return portalRoot
		? ReactDOM.createPortal(
				<ModalOverlay>
					<ModalStyle sx={style}>
						{allowClose && (
							<ModalClose onClick={onClose}>
								<CloseIcon
									sx={{
										fontSize: '22px',
										cursor: 'pointer',
									}}
								/>
							</ModalClose>
						)}
						<ModalHeader>
							<LeftHeader onClick={leftHeaderFn}>{leftHeader}</LeftHeader>
							<MainHeader fontStyle="italic" fontWeight="500">
								{mainHeader}
							</MainHeader>
						</ModalHeader>
						{pathname !== '/drop' && <DividerGradient sx={{ mb: '1rem' }} />}
						<WrapperChildren>{children}</WrapperChildren>
					</ModalStyle>
				</ModalOverlay>,
				portalRoot
		  )
		: null;
};

export default Modal;
