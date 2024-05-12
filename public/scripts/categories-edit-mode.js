import {
	addPutCategoryListeners,
	removePutCategoryListeners,
} from "./requests.js";

export const currentCategoryState = {
	name: "",
};

export let categoriesEditModeOn = false;

const useCategoryState = () => {
	function setCurrentCategoryState(key, value) {
		currentCategoryState[key] = value;
	}
	function setCategoriesEditModeOn(state) {
		categoriesEditModeOn = state;
	}
	return { setCurrentCategoryState, setCategoriesEditModeOn };
};

const useEditableCategoryElementsState = (categoryId) => {
	const targetElementsState = [
		{
			name: "name",
			element: document.querySelector(`#category-${categoryId} .name`),
			canEditText: true,
			canSetTransparency: true,
			canSetVisibility: false,
		},
	];
	return targetElementsState;
};

export const fillCategoriesStateFromPage = (categoryId) => {
	const { setCurrentCategoryState } = useCategoryState();
	setCurrentCategoryState(
		"name",
		document.querySelector(`#category-${categoryId} .name`).textContent
	);
};

export const fillCategoriesStateFromForm = (categoryId) => {
	const { setCurrentCategoryState } = useCategoryState();
	setCurrentCategoryState(
		"name",
		document.querySelector(`#category-${categoryId} .name`).textContent
	);
};

const changeTargetElementsStyle = (targetElementsState, state) => {
	if (state) {
		targetElementsState.forEach((element) => {
			element.element.contentEditable = element.canEditText;
			element.element.style.opacity = element.canSetTransparency ? ".5" : "1";
			element.element.focus();
		});
	} else {
		targetElementsState.forEach((element) => {
			element.element.contentEditable = !element.canEditText;
			element.element.style.opacity = element.canSetTransparency ? "1" : ".5";
		});
	}
};

const blurElements = (categoryId, state) => {
	const categoriesCards = [...document.querySelectorAll(".category-list-item")];
	if (state) {
		categoriesCards.forEach((card) => {
			if (card.id !== `category-${categoryId}`) {
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
		categoriesCards.forEach((card) => {
			if (card.id !== `category-${categoryId}`) {
				card.style.filter = "none";
				card.style.pointerEvents = "initial";
			} else {
				card.style.transform = "initial";
				card.style.boxShadow = "none";
				card.style.backgroundColor = "initial";
				card.style.zIndex = "initial";
				card.style.position = "initial";
				card.style.padding = "initial";
			}
		});
	}
};

const setButtonStyle = (categoryId, state) => {
	if (state) {
		document.querySelector(
			`#category-${categoryId} .edit-category-button svg use`
		).href.baseVal = "/svg/icons.svg#save";
		document.querySelector(
			`#category-${categoryId} .edit-category-button .visually-hidden`
		).textContent = "Сохранить";
		document.querySelector(
			`#category-${categoryId} .edit-category-button svg`
		).style.stroke = "lightgreen";
	} else {
		document.querySelector(
			`#category-${categoryId} .edit-category-button svg use`
		).href.baseVal = "/svg/icons.svg#edit";
		document.querySelector(
			`#category-${categoryId} .edit-category-button .visually-hidden`
		).textContent = "Редактировать";
		document
			.querySelector(`#category-${categoryId} .edit-category-button svg`)
			.removeAttribute("style");
	}
};

const setCloseButtonStyleAndListeners = (categoryId, state) => {
	if (state) {
		const handleCloseButtonClick = () => {
			changeCategoryEditMode(categoryId, false);
			document
				.querySelector(`#category-${categoryId} .close-item`)
				.removeEventListener("click", handleCloseButtonClick);
			removePutCategoryListeners();
			addCategoriesEditModeListeners();
		};
		document.querySelector(
			`#category-${categoryId} .close-item`
		).style.display = "block";
		document
			.querySelector(`#category-${categoryId} .close-item`)
			.addEventListener("click", handleCloseButtonClick);
	} else {
		document
			.querySelector(`#category-${categoryId} .close-item`)
			.removeAttribute("style");
	}
};

export const changeCategoryEditMode = (categoryId, state) => {
	const { setCategoriesEditModeOn } = useCategoryState();
	const targetElementsState = useEditableCategoryElementsState(categoryId);

	if (state) {
		changeTargetElementsStyle(targetElementsState, state);
		blurElements(categoryId, true);
		setButtonStyle(categoryId, true);
		setCategoriesEditModeOn(true);
		setCloseButtonStyleAndListeners(categoryId, true);
	} else {
		changeTargetElementsStyle(targetElementsState, false);
		blurElements(categoryId, false);
		setButtonStyle(categoryId, false);
		setCategoriesEditModeOn(false);
		setCloseButtonStyleAndListeners(categoryId, false);
	}
};

function handleButtonClick(event) {
	const categoryId = event.currentTarget.dataset.id;
	fillCategoriesStateFromPage(categoryId);
	changeCategoryEditMode(categoryId, true);
	const categoryButtons = [
		...document.querySelectorAll(".edit-category-button"),
	];
	categoryButtons.forEach((button) => {
		button.removeEventListener("click", handleButtonClick);
	});
	addPutCategoryListeners();
}

export const addCategoriesEditModeListeners = () => {
	const categoryButtons = [
		...document.querySelectorAll(".edit-category-button"),
	];
	categoryButtons.forEach((button) => {
		button.addEventListener("click", handleButtonClick);
	});
};
