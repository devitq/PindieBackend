import { postData, putData, deleteData } from "./api-interactors.js";
import {
	currentState,
	changeGameEditMode,
	addGamesEditModeListeners,
	fillStoreWithEditableElements,
} from "./games-edit-mode.js";
import {
	changeCategoryEditMode,
	currentCategoryState,
	addCategoriesEditModeListeners,
	fillCategoriesStateFromForm,
} from "./categories-edit-mode.js";
import {
	userCurrentState,
	changeUserEditMode,
	fillUsersStateFromForm,
	addUsersEditModeListeners,
} from "./users-edit-mode.js";
import { reload } from "./script.js";
import { closeDialog } from "./dialogs-controller.js";
import { showTooltip, hideTooltip } from "./dom-creators.js";

const prepareFormData = (form) => {
	const data = new FormData(form);
	var object = {};
	data.forEach((value, key) => {
		if (!object[key]) {
			object[key] = value;
		} else {
			if (typeof object[key] === "string") {
				object[key] = [object[key]];
			}
			object[key].push(value);
		}
	});
	return object;
};

const postNewGame = async (form) => {
	const object = prepareFormData(form);
	try {
		const response = await postData("/api/games", object);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		showTooltip(error.message);
		return false;
	}
};

const postNewCategory = async (form) => {
	const object = prepareFormData(form);
	try {
		const response = await postData("/api/categories", object);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		showTooltip(error.message);
		return false;
	}
};

const postNewUser = async (form) => {
	const object = prepareFormData(form);
	try {
		const response = await postData("/api/users", object);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		showTooltip(error.message);
		return false;
	}
};

const handleAddGamesSubmit = async (event) => {
	event.preventDefault();
	const form = document.querySelector(".form--game");
	const res = await postNewGame(form);
	if (res) {
		closeDialog();
		reload("games");
	}
};

function addGameFormListeners() {
	const postButton = document.querySelector(".add-game-button");
	postButton.addEventListener("click", () => {
		const form = document.querySelector(".form--game");
		form.addEventListener("submit", handleAddGamesSubmit);
	});
}

const removeGameFormListeners = () => {
	const form = document.querySelector(".form--game");
	form && form.removeEventListener("submit", handleAddGamesSubmit);
};

const handleAddCategoriesSubmit = async (event) => {
	event.preventDefault();
	const form = document.querySelector(".form--category");
	const res = await postNewCategory(form);
	if (res) {
		closeDialog();
		reload("categories");
	}
};

const addCategoryFormListeners = async () => {
	const postButton = document.querySelector(".add-category-button");
	postButton.addEventListener("click", () => {
		const form = document.querySelector(".form--category");
		form.addEventListener("submit", handleAddCategoriesSubmit);
	});
};

const removeCategoryFormListeners = () => {
	const form = document.querySelector(".form--category");
	form && form.removeEventListener("submit", handleAddCategoriesSubmit);
};

const handleAddUsersSubmit = async (event) => {
	event.preventDefault();
	const form = document.querySelector(".form--user");
	const res = await postNewUser(form);
	if (res) {
		closeDialog();
		reload("users");
	}
};

const addUserFormListeners = async () => {
	const postButton = document.querySelector(".add-user-button");
	postButton.addEventListener("click", () => {
		const form = document.querySelector(".form--user");
		form.addEventListener("submit", handleAddUsersSubmit);
	});
};

const removeUserFormListeners = () => {
	const form = document.querySelector(".form--user");
	form && form.removeEventListener("submit", handleAddUsersSubmit);
};

const deleteGame = async (id) => {
	const response = await deleteData(`/api/games/${id}`);
	return response;
};

const addDeleteGameListeners = async () => {
	const deleteButtons = document.querySelectorAll(".delete-game-button");
	deleteButtons.forEach((button) => {
		button.addEventListener("click", async (event) => {
			event.preventDefault();
			const id = event.target.dataset.id;
			const approved = confirm("Вы уверены, что хотите удалить эту игру?");
			if (approved) {
				const res = await deleteGame(id);
				reload("games");
			}
		});
	});
};

const deleteCategory = async (id) => {
	const response = await deleteData(`/api/categories/${id}`);
	return response;
};

const addDeleteCategoryListeners = async () => {
	const deleteButtons = document.querySelectorAll(".delete-category-button");
	deleteButtons.forEach((button) => {
		button.addEventListener("click", async (event) => {
			event.preventDefault();
			const id = event.currentTarget.dataset.id;
			const approved = confirm("Вы уверены, что хотите удалить эту категорию?");
			if (approved) {
				const res = await deleteCategory(id);
				reload("categories");
			}
		});
	});
};

const deleteUsers = async (id) => {
	const response = await deleteData(`/api/users/${id}`);
	return response;
};

const addDeleteUsersListeners = async () => {
	const deleteButtons = document.querySelectorAll(".delete-user-button");
	deleteButtons.forEach((button) => {
		button.addEventListener("click", async (event) => {
			event.preventDefault();
			const id = event.currentTarget.dataset.id;
			const approved = confirm(
				"Вы уверены, что хотите удалить этого пользователя?"
			);
			if (approved) {
				const res = await deleteUsers(id);
				reload("users");
			}
		});
	});
};

const putGame = async (id) => {
	try {
		const response = await putData(`/api/games/${id}`, currentState);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		showTooltip(error.message);
		return false;
	}
};

const sendGameUpdateAndTurnOffEditMode = async (event) => {
	event.preventDefault();
	const id = event.target.dataset.id;
	fillStoreWithEditableElements(id);
	const res = await putGame(id);
	if (res) {
		changeGameEditMode(id, false);
		reload("games");
		removePutGameListeners();
		addGamesEditModeListeners();
	}
};

const removePutGameListeners = () => {
	const putButtons = document.querySelectorAll(".edit-game-button");
	putButtons.forEach((button) => {
		button.removeEventListener("click", sendGameUpdateAndTurnOffEditMode);
	});
};

const addPutGameListeners = () => {
	const putButtons = document.querySelectorAll(".edit-game-button");
	putButtons.forEach((button) => {
		button.addEventListener("click", sendGameUpdateAndTurnOffEditMode);
	});
};

const putCategory = async (id) => {
	try {
		const response = await putData(
			`/api/categories/${id}`,
			currentCategoryState
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		showTooltip(error.message);
		return false;
	}
};

const removePutCategoryListeners = () => {
	const putButtons = document.querySelectorAll(".edit-category-button");
	putButtons.forEach((button) => {
		button.removeEventListener("click", sendCategoryUpdateAndTurnOffEditMode);
	});
};

const sendCategoryUpdateAndTurnOffEditMode = async (event) => {
	event.preventDefault();
	const id = event.currentTarget.dataset.id;
	fillCategoriesStateFromForm(id);
	const res = await putCategory(id);
	if (res) {
		reload("categories");
		removePutCategoryListeners();
		addCategoriesEditModeListeners();
		changeCategoryEditMode(id, false);
	}
};

const addPutCategoryListeners = async () => {
	const putButtons = document.querySelectorAll(".edit-category-button");
	putButtons.forEach((button) => {
		button.addEventListener("click", sendCategoryUpdateAndTurnOffEditMode);
	});
};

const putUser = async (id) => {
	try {
		const response = await putData(`/api/users/${id}`, userCurrentState);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response;
	} catch (error) {
		showTooltip(error.message);
		return false;
	}
};

const removePutUserListeners = () => {
	const putButtons = document.querySelectorAll(".edit-user-button");
	putButtons.forEach((button) => {
		button.removeEventListener("click", sendUserUpdateAndTurnOffEditMode);
	});
};

const sendUserUpdateAndTurnOffEditMode = async (event) => {
	event.preventDefault();
	const id = event.currentTarget.dataset.id;
	fillUsersStateFromForm(id);
	const res = await putUser(id);
	if (res) {
		reload("users");
		removePutUserListeners();
		addUsersEditModeListeners();
		changeUserEditMode(id, false);
	}
};

const addPutUserListeners = async () => {
	const putButtons = document.querySelectorAll(".edit-user-button");
	putButtons.forEach((button) => {
		button.addEventListener("click", sendUserUpdateAndTurnOffEditMode);
	});
};

export {
	addGameFormListeners,
	removeGameFormListeners,
	addCategoryFormListeners,
	removeCategoryFormListeners,
	addUserFormListeners,
	removeUserFormListeners,
	addDeleteGameListeners,
	addDeleteCategoryListeners,
	addDeleteUsersListeners,
	addPutGameListeners,
	addPutCategoryListeners,
	addPutUserListeners,
	removePutCategoryListeners,
	removePutUserListeners,
	removePutGameListeners,
};
