const btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", () => {
  const formInput = document.querySelector(".form");
  formInput.classList.toggle("show");
});

// jam
function updateJam() {
  const time = document.querySelector(".time");
  const jam = new Date();

  let hh = jam.getHours().toString().padStart(2, "0");
  let mm = jam.getMinutes().toString().padStart(2, "0");

  let hariIndex = jam.getDay();
  let tanggal = jam.getDate();
  let bulanIndex = jam.getMonth();
  let tahun = jam.getFullYear();

  const namaHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let hariIni = namaHari[hariIndex];
  let bulanIni = namaBulan[bulanIndex];

  const date = document.querySelector(".date");
  date.textContent = `${hariIni} ${tanggal} ${bulanIni} ${tahun}`;

  time.textContent = `${hh}:${mm}`;
}
setInterval(updateJam, 1000);
updateJam();

// function bikin list
const bikinList = (inputList, inputJam, index) => {
  // untuk nama list
  const main = document.querySelector("main");
  const list = document.createElement("div");
  list.classList.add("list");
  const item = document.createElement("div");
  item.classList.add("item");
  item.dataset.index = index;
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

  // bikin icon
  const icon = document.createElement("div");
  icon.classList.add("icon");
  const edit = document.createElement("i");
  edit.classList.add("bx", "bx-pencil");
  const hapus = document.createElement("i");
  hapus.classList.add("bx", "bx-backspace");

  // bikin titik tiga
  const menuMobile = document.createElement("div");
  menuMobile.classList.add("menu-mobile");
  const titik = document.createElement("span");
  titik.classList.add("titik-tiga");
  const icontitik = document.createElement("i");
  icontitik.classList.add("bx", "bx-dots-vertical-rounded");
  const opsi = document.createElement("div");
  opsi.classList.add("opsi-menu");
  const opsiEdit = document.createElement("span");
  opsiEdit.classList.add("opsi", "edit");
  opsiEdit.textContent = "edit";
  const opsiHapus = document.createElement("span");
  opsiHapus.classList.add("opsi", "hapus");
  opsiHapus.textContent = "hapus";
  titik.appendChild(icontitik);
  opsi.appendChild(opsiEdit);
  opsi.appendChild(opsiHapus);
  menuMobile.appendChild(titik);
  menuMobile.appendChild(opsi);

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
  icon.appendChild(edit);
  icon.appendChild(hapus);
  item.appendChild(icon);
  item.appendChild(menuMobile);
};

const btnSave = document
  .querySelector(".btn-save")
  .addEventListener("click", () => {
    const nama = document.querySelector("#inputNama").value;
    const jam = document.querySelector("#inputjam").value;
    // validasi inputan jam
    function validasiJam(jam) {
      const regex = /^([01]\d|2[0-3])[:.]([0-5]\d)$/;
      return regex.test(jam);
    }
    if (!validasiJam(jam)) {
      alert("data waktu yg anda masukkan salah");
    } else {
      const formInput = document.querySelector(".form");
      formInput.classList.toggle("show");
      const form = document.querySelector("form").reset();
      simpanData(nama, jam);
      let data = JSON.parse(localStorage.getItem("list"));
      bikinList(nama, jam, data.length - 1);

      // simpan ke lokal storage
      function simpanData(nama, jam) {
        let dataString = localStorage.getItem("list"); // ambil dari storage
        let data = dataString ? JSON.parse(dataString) : []; // parse atau bikin array kosong
        data.push({ nama, jam });
        localStorage.setItem("list", JSON.stringify(data));
      }
    }
  });
// jika di refresh list ga hilang
document.addEventListener("DOMContentLoaded", function () {
  let dataString = localStorage.getItem("list");
  let data = dataString ? JSON.parse(dataString) : [];
  data.forEach((item, index) => {
    bikinList(item.nama, item.jam, index);
  });
});

const main = document.querySelector("main");
main.addEventListener("click", (e) => {
  const elemen = e.target;
  // coret list yg udah done
  if (elemen.matches('.checkbox-wrapper input[type = "checkbox"]')) {
    const item = elemen.closest(".item");
    const judul = item.querySelector(".judul");

    if (elemen.checked) {
      judul.classList.toggle("done");
    } else {
      judul.classList.toggle("done");
    }
  }
  function buatInput(judul, item) {
    const inputBaru = document.createElement("input");
    inputBaru.classList.add("judul");
    inputBaru.value = judul.textContent;
    inputBaru.type = "text";
    inputBaru.id = "inputBaru";
    item.replaceChild(inputBaru, judul);
  }
  function bikinJudul(inputBaru, item) {
    const judulBaru = document.createElement("span");
    judulBaru.classList.add("judul");
    judulBaru.textContent = inputBaru.value;
    item.replaceChild(judulBaru, inputBaru);
  }

  // jika klik icon edit
  if (elemen.closest(".bx-pencil")) {
    const item = elemen.closest(".item");
    const judul = item.querySelector(".judul");
    const edit = item.querySelector(".bx-pencil");
    buatInput(judul, item);

    edit.classList.replace("bx-pencil", "bx-check");
  } else if (elemen.closest(".bx-check")) {
    const item = elemen.closest(".item");
    const inputBaru = item.querySelector("input.judul");
    bikinJudul(inputBaru, item);

    const index = item.dataset.index;
    let data = JSON.parse(localStorage.getItem("list"));
    let jamLama = data[index].jam;
    data[index].nama = inputBaru.value;
    localStorage.setItem("list", JSON.stringify(data));

    elemen.classList.replace("bx-check", "bx-pencil");
  } else if (elemen.closest(".bx-backspace")) {
    const list = elemen.closest(".list");
    const item = elemen.closest(".item");
    let index = item.dataset.index;
    let data = JSON.parse(localStorage.getItem("list"));
    data.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(data));
    list.remove();
  } else if (elemen.closest(".bx-dots-vertical-rounded")) {
    const item = elemen.closest(".item");
    const menu = item.querySelector(".opsi-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";

    const edit = item.querySelector(".edit");
    edit.addEventListener("click", () => {
      if (edit.textContent == "edit") {
        const judul = item.querySelector(".judul");
        buatInput(judul, item);
        edit.textContent = "simpan";
      } else if (edit.textContent == "simpan") {
        const item = elemen.closest(".item");
        const inputBaru = item.querySelector("input.judul");
        bikinJudul(inputBaru, item);
        const index = item.dataset.index;
        let data = JSON.parse(localStorage.getItem("list"));
        let jamLama = data[index].jam;
        data[index].nama = inputBaru.value;
        localStorage.setItem("list", JSON.stringify(data));
        edit.textContent = "edit";
      }
    });
    // hapus di mobile
    const hapus = item.querySelector(".hapus");
    hapus.addEventListener("click", () => {
      const list = elemen.closest(".list");
      const item = elemen.closest(".item");
      let index = item.dataset.index;``
      let data = JSON.parse(localStorage.getItem("list"));
      data.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(data));
      list.remove();
    });
  }
});
