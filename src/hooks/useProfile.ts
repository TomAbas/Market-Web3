/* eslint-disable @typescript-eslint/no-unused-vars */
import { nftItem } from 'models/item';
import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'redux/hooks';

const useProfile = () => {
	const bioRef: any = useRef();
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [viewFull, setViewFull] = useState(false);
	const [viewAvatar, setViewAvatar] = useState(false);
	const [infoUser, setInfoUser] = useState<any>();
	const [items, setItems] = useState<nftItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	function handleToggleViewFull() {
		setViewFull(!viewFull);
	}
	function handleToggleEditModal() {
		setOpenEdit(!openEdit);
	}
	function handleToggleAvatar() {
		setViewAvatar(!viewAvatar);
	}
	return { bioRef, handleToggleEditModal, handleToggleViewFull, handleToggleAvatar };
};

export default useProfile;
