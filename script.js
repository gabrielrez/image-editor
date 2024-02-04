const cleanBtn = document.querySelector(".clean-btn");
const addBtn = document.querySelector(".new-btn");
const saveBtn = document.querySelector(".save-btn");
const inputFile = document.querySelector("input[type=file]");
const img = document.querySelector(".img-content img");
const range = document.querySelector("input[type=range]");
const effectBtns = document.querySelectorAll(".effect");

let rotate;
let flipX;
let flipY;
let filterActive;
let filters;

init();

function init() {
  filters = {
    Brilho: { value: 100, max: 200 },
    Contraste: { value: 100, max: 200 },
    Saturação: { value: 100, max: 200 },
    Cinza: { value: 0, max: 100 },
    Inverter: { value: 0, max: 100 },
  };

  rotate = 0;
  flipX = 1;
  flipY = 1;

  filterActive = "Brilho";
  range.max = 200;
  range.value = 100;

  img.style.transform = "";
  img.style.filter = "";

  document.querySelector(".active").classList.remove("active");
  document.querySelector("#filterDefault").classList.add("active");
}

function handleDirection(type) {
  if (type === "rotateLeft") {
    rotate -= 90;
  } else if (type === "rotateRight") {
    rotate += 90;
  } else if (type === "flipX") {
    flipX = flipX === 1 ? -1 : 1;
  } else {
    flipY = flipY === 1 ? -1 : 1;
  }

  img.style.transform = `rotate(${rotate}deg) scaleX(${flipX}) scaleY(${flipY})`;
}

function loadNewImage() {
  let file = inputFile.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
  }
  init();
}

function saveImage() {
  const link = document.createElement("a");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.filter = img.style.filter;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  link.href = canvas.toDataURL("image/png");

  // Define o nome do arquivo a ser baixado
  link.download = "imagem_editada.png";

  // Dispara o evento de clique no link
  link.click();
}

cleanBtn.addEventListener("click", init);
addBtn.addEventListener("click", function () {
  inputFile.click();
});

inputFile.addEventListener("change", loadNewImage);

range.addEventListener("input", function () {
  filters[filterActive].value = range.value;

  img.style.filter = `
  brightness(${filters["Brilho"].value}%)
  contrast(${filters["Contraste"].value}%)
  saturate(${filters["Saturação"].value}%)
  grayscale(${filters["Cinza"].value}%)
  invert(${filters["Inverter"].value}%)
  `;
});

effectBtns.forEach((item) => {
  item.addEventListener("click", function () {
    effectBtns.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
    filterActive = this.getAttribute("data-type");
  });
});

saveBtn.addEventListener("click", saveImage);