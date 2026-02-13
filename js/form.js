import { addItem } from "./script.js";

export function createForm() {
	const form = document.createElement("form");

	form.innerHTML = `
    <h2>Plan your day</h2>
    <div class="form-control">
      <input
        type="text"
        class="form-input"
        placeholder="e.g. Buy groceries, Walk the dog"
        maxlength="100"
        required
      />
      <button type="submit" class="btn">
        add task
      </button>
    </div>
  `;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = form.querySelector(".form-input");
		const value = input.value.trim();

		if (!value) {
			input.classList.add("error");
			setTimeout(() => input.classList.remove("error"), 600);
			return;
		}

		addItem(value);
		input.value = "";
	});

	return form;
}