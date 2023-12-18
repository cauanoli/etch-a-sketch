function main() {
  let color = "#000000";
  let toolName = "pencil";

  const colorSelector = document.querySelector("#color-selector");
  const pencilTool = document.querySelector("#pencil");
  const eraserTool = document.querySelector("#eraser");

  const tools = [pencilTool, eraserTool];

  colorSelector.addEventListener("change", (event) => {
    color = event.target.value;
  });

  tools.forEach((tool) => {
    if (toolName === tool.id) {
      tool.classList.add("active");
    }

    tool.addEventListener("click", (event) => {
      tools.forEach((tool) => {
        if (tool.id !== event.target.id) {
          tool.classList.remove("active");
        }
      });

      event.target.classList.add("active");
      toolName = event.target.id;
    });
  });

  const gridContainer = document.querySelector(".sketch-grid");
  const gridSizeSelector = document.querySelector("#grid-size");
  const clearGridButton = document.querySelector(".clear-grid-button");

  clearGridButton.addEventListener("click", clearGrid);

  let gridSize = gridSizeSelector.value;
  createGridElements(gridSize);

  gridSizeSelector.addEventListener("change", (event) => {
    gridSize = event.target.value;
    gridContainer.innerHTML = "";
    createGridElements(gridSize);
  });

  function clearGrid() {
    gridContainer.childNodes.forEach((node) => {
      node.style.backgroundColor = "#ffffff";
      node.classList.remove("painted");
    });
  }

  function createGridElements(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const gridElement = document.createElement("div");
      gridElement.style.width = `${(1 / gridSize) * 100}%`;

      gridElement.addEventListener("click", (event) => {
        if (toolName === "eraser") {
          event.target.style.backgroundColor = "#ffffff";
          event.target.classList.remove("painted");
        }

        if (toolName === "pencil" && event.target.backgroundColor !== color) {
          event.target.style.backgroundColor = color;
          event.target.classList.add("painted");
        }
      });

      gridContainer.appendChild(gridElement);
    }
  }
}

main();
