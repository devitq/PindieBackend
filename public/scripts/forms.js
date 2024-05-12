import { categoriesState } from "./script.js";

const createGameForm = () => {
	const template = document.querySelector(".add-game-form");
	const clone = template.content.cloneNode(true);
	const parent = clone.querySelector(".categories-fields");
	categoriesState.forEach((category) => {
		const label = document.createElement("label");
		label.className = "form-label";
		const span = document.createElement("span");
		span.textContent = category.name;
		span.className = "form-label-text";
		label.append(span);
		const input = document.createElement("input");
		input.type = "checkbox";
		input.name = "categories";
		input.className = "checkbox";
		input.value = category._id;
		label.append(input);
		parent.append(label);
	});
	return clone;
};

const appendGameForm = () => {
	const gameForm = createGameForm();
	const parent = document.querySelector(".form-container");
	parent.innerHTML = "";
	parent.append(gameForm);
};

const createCategoryForm = () => {
	const template = document.querySelector(".add-category-form");
	const clone = template.content.cloneNode(true);
	return clone;
};

const appendCategoryForm = () => {
	const categoryForm = createCategoryForm();
	const parent = document.querySelector(".form-container");
	parent.innerHTML = "";
	parent.append(categoryForm);
};

const createUserForm = () => {
	const template = document.querySelector(".add-user-form");
	const clone = template.content.cloneNode(true);
	return clone;
};

const appendUserForm = () => {
	const userForm = createUserForm();
	const parent = document.querySelector(".form-container");
	parent.innerHTML = "";
	parent.append(userForm);
};

const createCategoryCheckboxInEditModeForm = (categoryObj) => {
	const clone = document
		.querySelector("#categories-checkbox")
		.content.cloneNode(true);
	clone.querySelector("input").value = categoryObj._id;
	clone.querySelector("span").textContent = categoryObj.name;
	return clone;
};

const appendCategoryEditModeForm = (categoryArray, parent) => {
	categoryArray.forEach((category) => {
		const checkbox = createCategoryCheckboxInEditModeForm(category);
		parent.append(checkbox);
	});
};

export {
	appendGameForm,
	appendCategoryForm,
	appendUserForm,
	appendCategoryEditModeForm,
};
