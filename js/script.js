import { createItems } from "./items.js";
import { createForm } from "./form.js";

const STORAGE_KEY = "worklist";

let items = [];

function getLocalStorage() {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (!stored) return [];
	try {
		return JSON.parse(stored);
	} catch {
		return [];
	}
}

function setLocalStorage(itemsArray) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsArray));
}

function render() {
	const app = document.querySelector("#app");
	if (!app) return;
	app.innerHTML = "";

	const form = createForm();
	const itemsView = createItems(items);

	app.appendChild(form);
	app.appendChild(itemsView);
}

export function addItem(name) {
	const newItem = {
		id: Date.now().toString(),
		name,
		completed: false,
	};
	items.push(newItem);
	setLocalStorage(items);
	render();
}

export function updateItemName(id, newName) {
	items = items.map((item) =>
		item.id === id ? { ...item, name: newName } : item
	);
	setLocalStorage(items);
	render();
}

export function editCompleted(id) {
	items = items.map((item) =>
		item.id === id ? { ...item, completed: !item.completed } : item
	);
	setLocalStorage(items);
	render();
}

export function removeItem(id) {
	items = items.filter((item) => item.id !== id);
	setLocalStorage(items);
	render();
}

document.addEventListener("DOMContentLoaded", () => {
	items = getLocalStorage();
	render();
});

