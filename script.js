
const btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", () => {
  const formInput = document.querySelector(".form-input");
  formInput.style.display = "flex";
});

// function bikin list
const bikinList = (inputList, inputJam) => {
  // untuk nama list
  const main = document.querySelector("main");
  const list = document.createElement("div");
  list.classList.add("list");
  const item = document.createElement("div");
  item.classList.add("item");
  const label = document.createElement("label");
  label.classList.add("checkbox-wrapper");
  const inputcheck = document.createElement("input");
  inputcheck.type = "checkbox";
  const checkcustom = document.createElement("span");
  checkcustom.classList.add("checkbox-custom");
  const spann = document.createElement("span");
  spann.classList.add("judul");
  spann.textContent = inputList;

  // untuk jam
  const jam = document.createElement("div");
  jam.classList.add("jam");
  const waktu = document.createElement("span");
  waktu.textContent = inputJam;

  jam.appendChild(waktu);

  label.appendChild(inputcheck);
  label.appendChild(checkcustom);
  item.appendChild(label);
  item.appendChild(spann);
  list.appendChild(item);
  list.appendChild(jam);
  main.appendChild(list);
};

const btnSave = document
  .querySelector(".btn-save")
  .addEventListener("click", () => {
    const inputList = document.querySelector("#inputNama").value;
    const inputJam = document.querySelector("#inputjam").value;
    console.log(inputList, inputJam);
    bikinList(inputList, inputJam);
    const formInput = document.querySelector(".form-input");
    formInput.style.display = "none";
    const form = document.querySelector('form').reset()
  });
