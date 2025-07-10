const btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", () => {
  const formInput = document.querySelector(".form");
  formInput.classList.toggle("show");
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
  inputcheck.id = "taskcheck";
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
    const formInput = document.querySelector(".form");
    formInput.classList.toggle("show");
    const form = document.querySelector("form").reset();
  });

// bikin garis tengah pada text
//  const AllcheckBox = document.querySelectorAll()
//  AllcheckBox.forEach((chechbox)=>{
//   console.log('done 1');

//   chechbox.addEventListener('change',()=>{
//     console.log('done 2');
//     const item = chechbox.closest('.item')
//     const judul = item.querySelector('.judul')
//     console.log('done 3');

//     if(chechbox.cheched){
//       judul.style.textDecoration = 'line-trough'
//       console.log('done 4');
//     } else{
//       judul.style.textDecoration = 'none'

//     }
//   })
//  })

const main = document.querySelector("main");
main.addEventListener("click", (e) => {
  const checkbox = e.target;
  if (checkbox.matches('.checkbox-wrapper input[type = "checkbox"]')) {
    console.log('done 1');
    const item = checkbox.closest(".item");
    const judul = item.querySelector(".judul");
    
    if (checkbox.checked) {
      judul.classList.toggle('done')
      console.log('done 2');
    } else{
      judul.classList.toggle('done')

    }
  }
});
