import { addPutUserListeners, removePutUserListeners } from "./requests.js";

export const userCurrentState = {
	username: "",
	email: "",
};

export let usersEditModeOn = false;

const useUserState = () => {
	function setCurrentUserState(key, value) {
		userCurrentState[key] = value;
	}
	function setUsersEditModeOn(state) {
		usersEditModeOn = state;
	}
	return { setCurrentUserState, setUsersEditModeOn };
};

const useEditableUserElementsState = (userId) => {
	const targetElementsState = [
		{
			name: "username",
			element: document.querySelector(`#user-${userId} .name`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
		},
		{
			name: "email",
			element: document.querySelector(`#user-${userId} .email`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
		},
	];
	return targetElementsState;
};

export const fillUsersStateFromPage = (userId) => {
	const targetElementsState = useEditableUserElementsState(userId);
	const { setCurrentUserState } = useUserState();
	setCurrentUserState(
		"username",
		targetElementsState.find((item) => item.name === "username").element
			.textContent
	);
	setCurrentUserState(
		"email",
		targetElementsState.find((item) => item.name === "email").element
			.textContent
	);
};

export const fillUsersStateFromForm = (userId) => {
	const targetElementsState = useEditableUserElementsState(userId);
	const { setCurrentUserState } = useUserState();
	setCurrentUserState(
		"username",
		targetElementsState.find((item) => item.name === "username").element
			.textContent
	);
	setCurrentUserState(
		"email",
		targetElementsState.find((item) => item.name === "email").element
			.textContent
	);
};

const changeTargetElementsStyle = (userId, targetElementsState, state) => {
	if (state) {
		targetElementsState.forEach((element) => {
			element.element.contentEditable = element.canEditText;
			element.element.style.opacity = element.canSetTransparency ? ".5" : "1";
		});
		targetElementsState
			.find((item) => item.name === "username")
			.element.focus();
		const usersCards = [...document.querySelectorAll(".user-list-item")];
		usersCards.forEach((card) => {
			if (card.id !== `user-${userId}`) {
				card.style.filter = "blur(10px)";
				card.style.pointerEvents = "none";
			} else {
				card.style.transform = "scale(1.1)";
				card.style.boxShadow = "0 0 0 10px #333";
				card.style.backgroundColor = "white";
				card.style.zIndex = "1";
				card.style.position = "relative";
				card.style.padding = "2em";
			}
		});
	} else {
		targetElementsState.forEach((element) => {
			element.element.contentEditable = !element.canEditText;
			element.element.style.opacity = !element.canSetTransparency ? ".5" : "1";
		});
		const usersCards = [...document.querySelectorAll(".user-list-item")];
		usersCards.forEach((card) => {
			card.style.filter = "none";
			card.style.pointerEvents = "auto";
			card.style.transform = "scale(1)";
			card.style.boxShadow = "none";
			card.style.backgroundColor = "transparent";
			card.style.zIndex = "0";
			card.style.position = "static";
			card.style.padding = "0";
		});
	}
};

const setButtonStyle = (userId, state) => {
	if (state) {
		document.querySelector(
			`#user-${userId} .edit-user-button svg use`
		).href.baseVal = "/svg/icons.svg#save";
		document.querySelector(
			`#user-${userId} .edit-user-button .visually-hidden`
		).textContent = "Сохранить";
		document.querySelector(
			`#user-${userId} .edit-user-button svg`
		).style.stroke = "lightgreen";
	} else {
		document.querySelector(
			`#user-${userId} .edit-user-button svg use`
		).href.baseVal = "/svg/icons.svg#edit";
		document.querySelector(
			`#user-${userId} .edit-user-button .visually-hidden`
		).textContent = "Редактировать";
		document
			.querySelector(`#user-${userId} .edit-user-button svg`)
			.removeAttribute("style");
	}
};

const setCloseButtonStyleAndListeners = (userId, state) => {
	if (state) {
		const handleCloseButtonClick = () => {
			changeUserEditMode(userId, false);
			document
				.querySelector(`#user-${userId} .close-item`)
				.removeEventListener("click", handleCloseButtonClick);
			removePutUserListeners();
			addUsersEditModeListeners();
			document
				.querySelector(`#user-${userId} .close-item`)
				.removeAttribute("style");
		};
		document.querySelector(`#user-${userId} .close-item`).style.display =
			"block";
		document
			.querySelector(`#user-${userId} .close-item`)
			.addEventListener("click", handleCloseButtonClick);
	}
};

export const changeUserEditMode = (userId, state) => {
	const targetElementsState = useEditableUserElementsState(userId);
	const { setUsersEditModeOn } = useUserState();
	if (state) {
		changeTargetElementsStyle(userId, targetElementsState, true);
		setButtonStyle(userId, true);
		setCloseButtonStyleAndListeners(userId, true);
		setUsersEditModeOn(true);
	} else {
		changeTargetElementsStyle(userId, targetElementsState, false);
		setButtonStyle(userId, false);
		setCloseButtonStyleAndListeners(userId, false);
		setUsersEditModeOn(false);
	}
};

const handleButtonClick = (event) => {
	const userId = event.currentTarget.dataset.id;
	fillUsersStateFromPage(userId);
	changeUserEditMode(userId, true);
	const userEditButton = document.querySelectorAll(".edit-user-button");
	userEditButton.forEach((button) => {
		button.removeEventListener("click", handleButtonClick);
	});
	addPutUserListeners();
};

export const addUsersEditModeListeners = () => {
	const userEditButton = document.querySelectorAll(".edit-user-button");
	userEditButton.forEach((button) => {
		button.addEventListener("click", handleButtonClick);
	});
};
