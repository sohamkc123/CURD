import { editCompleted, removeItem, updateItemName } from "./script.js";

export function createSingleItem(item) {
  const div = document.createElement("div");
  div.className = "single-item";
  if (item.completed) {
    div.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.completed;
  checkbox.addEventListener("change", () => editCompleted(item.id));

  const text = document.createElement("p");
  text.textContent = item.name;

  const editBtn = document.createElement("button");
  editBtn.className = "btn icon-btn edit-btn";
  editBtn.type = "button";
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn icon-btn remove-btn";
  removeBtn.type = "button";
  removeBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  let editing = false;
  let inputEl = null;

  editBtn.addEventListener("click", () => {
    if (!editing) {
      editing = true;
      inputEl = document.createElement("input");
      inputEl.type = "text";
      inputEl.className = "inline-edit-input";
      inputEl.value = item.name;

      div.replaceChild(inputEl, text);
      editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      inputEl.focus();
      inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
    } else if (inputEl) {
      const newName = inputEl.value.trim();
      if (!newName) {
        inputEl.classList.add("error");
        setTimeout(() => inputEl && inputEl.classList.remove("error"), 600);
        return;
      }
      updateItemName(item.id, newName);
    }
  });

  inputEl &&
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        editBtn.click();
      }
    });

  removeBtn.addEventListener("click", () => removeItem(item.id));

  div.appendChild(checkbox);
  div.appendChild(text);
  div.appendChild(editBtn);
  div.appendChild(removeBtn);

  return div;
}