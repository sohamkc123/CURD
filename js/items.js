import { createSingleItem } from "./single-item.js";

export function createItems(itemsArray) {
  const container = document.createElement("div");
  container.className = "items-wrapper";

  const statsDiv = document.createElement("div");
  statsDiv.className = "items-stats";
  const completedCount = itemsArray.filter((item) => item.completed).length;
  const progress =
    itemsArray.length > 0
      ? Math.round((completedCount / itemsArray.length) * 100)
      : 0;

  let faceClass = "face-sad";
  if (progress >= 25) faceClass = "face-meh";
  if (progress >= 50) faceClass = "face-neutral";
  if (progress >= 75) faceClass = "face-happy";
  if (progress === 100 && itemsArray.length > 0) faceClass = "face-excited";

  statsDiv.innerHTML = `
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progress}%"></div>
    </div>
    <p class="items-summary">${itemsArray.length} tasks · ${completedCount} done</p>
    <div class="items-mood-container">
      <div class="mood-sprite ${faceClass}"></div>
    </div>
  `;
  container.appendChild(statsDiv);

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "items";

  if (itemsArray.length === 0) {
    itemsContainer.innerHTML =
      '<p class="empty-state">No todos yet. Add one to get started!</p>';
  } else {
    itemsArray.forEach((item) => {
      const itemElement = createSingleItem(item);
      itemsContainer.appendChild(itemElement);
    });
  }

  container.appendChild(itemsContainer);
  return container;
}