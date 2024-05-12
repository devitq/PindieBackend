import { categoriesState } from "./script.js";
import {
	createGameCategoriesForm,
	removeGameCategoriesForm,
	createGameCategoryBlock,
	removeGameCategoryBlock,
	hideVotesBlock,
	showVotesBlock,
} from "./dom-creators.js";
import { addPutGameListeners, removePutGameListeners } from "./requests.js";

export const currentState = {
	title: "",
	description: "",
	developer: "",
	link: "",
	image: "",
	categories: [],
};
export let gamesEditModeOn = false;

export const useGameState = () => {
	// мутации стейта
	function setCurrentState(key, value) {
		currentState[key] = value;
	}
	function setGamesEditModeOn(state) {
		gamesEditModeOn = state;
	}
	return { setCurrentState, setGamesEditModeOn };
};

const useEditableElementsState = (gameId) => {
	const targetElementsState = [
		{
			name: "title",
			element: document.querySelector(`#game-${gameId} h3`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
			canSetSource: false,
		},
		{
			name: "description",
			element: document.querySelector(`#game-${gameId} .text`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
			canSetSource: false,
		},
		{
			name: "developer",
			element: document.querySelector(`#game-${gameId} .developer`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
			canSetSource: false,
		},
		{
			name: "link",
			element: document.querySelector(`#game-${gameId} a`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
			canSetSource: true,
		},
		{
			name: "image",
			element: document.querySelector(`#game-${gameId} img`),
			canEditText: false,
			canSetTransparency: true,
			canSetVisibility: false,
			canSetSource: true,
		},
		{
			name: "categoriesForm",
			element: [
				...document.querySelectorAll(`#game-${gameId} .game-categories-form`),
			],
			canEditText: false,
			canSetTransparency: false,
			canSetVisibility: true,
		},
		{
			name: "imageInput",
			element: [
				...document.querySelectorAll(`#game-${gameId} .image-url-input`),
			],
			canEditText: false,
			canSetTransparency: false,
			canSetVisibility: true,
			canSetSource: false,
		},
	];

	function setTransparency(state) {
		targetElementsState.forEach((item) => {
			item.canSetTransparency &&
				(item.element.style.opacity = state ? ".5" : "1");
		});
		return targetElementsState;
	}

	function setCanEditText(state) {
		targetElementsState.forEach((item) => {
			item.canEditText && item.element.setAttribute("contenteditable", state);
		});
		return targetElementsState;
	}

	function setVisibility(state) {
		targetElementsState.forEach((item) => {
			item.canSetVisibility &&
				item.element.forEach((element) => {
					element.style.display = state ? "block" : "none";
				});
		});
		return targetElementsState;
	}
	return {
		targetElementsState,
		setTransparency,
		setCanEditText,
		setVisibility,
	};
};

export const fillStoreWithPageData = (gameId) => {
	const { setCurrentState } = useGameState();
	let { targetElementsState } = useEditableElementsState(gameId);
	// наполнить стор из аттрибутов элементов
	const allCategories = [
		...document.querySelectorAll(`#game-${gameId} .categories li`),
	];
	const categoriesIdArray = allCategories.map(
		(category) => category.dataset.id
	);
	setCurrentState("categories", categoriesIdArray);

	targetElementsState.forEach((item) => {
		if (item.canEditText) {
			setCurrentState(item.name, item.element.textContent);
		}
		if (item.canSetSource) {
			setCurrentState(item.name, item.element.src || item.element.href);
		}

		// показывает новые элементы
		if (item.canSetVisibility) {
			item.element.forEach((element) => {
				element.removeAttribute("style");
				element.focus();
			});
		}
	});
};

export const fillStoreWithEditableElements = (gameId) => {
	const { setCurrentState } = useGameState();
	let { targetElementsState } = useEditableElementsState(gameId);
	// наполнить стор из аттрибутов элементов
	targetElementsState.forEach((item) => {
		if (item.canEditText) {
			setCurrentState(item.name, item.element.textContent);
		}
		if (item.canSetSource) {
			setCurrentState(item.name, item.element.src || item.element.href);
		}
		if (item.name === "imageInput") {
			setCurrentState("image", item.element[0].value);
		}
		if (item.name === "categoriesForm") {
			const checkboxes = [...item.element[0].querySelectorAll("input")];
			const checkedCategories = checkboxes.filter(
				(checkbox) => checkbox.checked
			);
			const categoriesIdArray = checkedCategories.map(
				(category) => category.value
			);
			setCurrentState("categories", categoriesIdArray);
		}
	});
};

const setButtonStyle = (gameId, state) => {
	const button = document.querySelector(`#game-${gameId} .edit-game-button`);
	if (state) {
		// Устанавливает кнопку
		button.style.backgroundColor = "lightgreen";
		button.textContent = "Сохранить";
	} else {
		button.removeAttribute("style");
		button.textContent = "Редактировать игру";
	}
};

const blurElements = (gameId, state) => {
	const gameCards = [...document.querySelectorAll(".game-card")];
	if (state) {
		gameCards.forEach((card) => {
			if (card.id !== `game-${gameId}`) {
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
		gameCards.forEach((card) => {
			if (card.id !== `game-${gameId}`) {
				card.style.filter = "none";
				card.style.pointerEvents = "initial";
			} else {
				card.style.transform = "initial";
				card.style.boxShadow = "initial";
				card.style.backgroundColor = "initial";
				card.style.zIndex = "initial";
				card.style.position = "initial";
				card.style.padding = "initial";
			}
		});
	}
};

const setCloseButtonStyleAndListeners = (gameId, state) => {
	const button = document.querySelector(`#game-${gameId} .close-item`);
	if (state) {
		button.style.display = "block";
		const handleCloseButtonClick = () => {
			changeGameEditMode(gameId, false);
			button.removeEventListener("click", handleCloseButtonClick);
			removePutGameListeners();
			addGamesEditModeListeners();
			setButtonStyle(gameId, false);
		};
		button.addEventListener("click", handleCloseButtonClick);
	} else {
		document
			.querySelector(`#game-${gameId} .close-item`)
			.removeAttribute("style");
	}
};

export function changeGameEditMode(gameId, state) {
	const { setGamesEditModeOn } = useGameState();
	let { setTransparency, setCanEditText, setVisibility } =
		useEditableElementsState(gameId);

	if (state) {
		setButtonStyle(gameId, state);
		blurElements(gameId, state);
		setTransparency(true);
		setCanEditText(true);
		setVisibility(true);
		setGamesEditModeOn(true);
		createGameCategoriesForm(gameId, categoriesState, currentState);
		removeGameCategoryBlock(gameId);
		hideVotesBlock(gameId);
		setCloseButtonStyleAndListeners(gameId, true);
	} else {
		setTransparency(false);
		setCanEditText(false);
		setVisibility(false);
		setGamesEditModeOn(false);
		blurElements(gameId, false);
		removeGameCategoriesForm(gameId);
		createGameCategoryBlock(gameId, categoriesState, currentState);
		showVotesBlock(gameId);
		setCloseButtonStyleAndListeners(gameId, false);
	}

	return { currentState, gamesEditModeOn };
}

const turnOnEditModeHandler = function (e) {
	let gameId = e.target.dataset.id;
	fillStoreWithPageData(gameId);
	changeGameEditMode(gameId, true);
	const gameButtons = [...document.querySelectorAll(".edit-game-button")];
	gameButtons.forEach((button) => {
		button.removeEventListener("click", turnOnEditModeHandler);
	});
	addPutGameListeners();
};

export const addGamesEditModeListeners = () => {
	const gameButtons = [...document.querySelectorAll(".edit-game-button")];
	gameButtons.forEach((button) => {
		button.addEventListener("click", turnOnEditModeHandler);
	});
};
