let formMode = "";
let computerIdForEdit = null;
const categotyInput = document.querySelector(".categotyInput");
const nameInput = document.querySelector(".nameInput");
const descriptionInput = document.querySelector(".descriptionInput");
const priceInput = document.querySelector(".priceInput");
const newSelect = document.querySelector(".newSelect");
const imageInput = document.querySelector(".imageInput");
const ramInput = document.querySelector(".ramInput");
const cpuInput = document.querySelector(".cpuInput");
const romInput = document.querySelector(".romInput");
const romTypeSelect = document.querySelector(".romTypeSelect");
const operationSystemInput = document.querySelector(".operationSystemInput");
const videoCartInput = document.querySelector(".videoCartInput");
const imageInForm = document.querySelector(".imageInForm");

function render() {
  document.querySelector(".tbody").innerHTML = "";
  const user = JSON.parse(localStorage.getItem("user") || '{"computers": []}');
  
  user.computers.forEach((computer, index) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = index + 1;

    const tdName = document.createElement("td");
    tdName.textContent = computer.name;

    const tdImage = document.createElement("td");
    const image = document.createElement("img");
    image.width = 70;
    image.src = computer.img;
    image.setAttribute("data-bs-toggle", "modal");
    image.setAttribute("data-bs-target", "#imageModal");
    image.addEventListener("click", () => {
      document.querySelector(".imageInModal").src = computer.img;
    });

    tdImage.append(image);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = computer.price + "$";

    const tdOperations = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.className = "btn btn-primary mx-2";
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#computerModal");
    editBtn.addEventListener("click", () => {
      formMode = "editComputer";
      computerIdForEdit = computer.id;
      document.querySelector(".computerFormTitle").textContent = "Edit Computer";
      categotyInput.value = computer.category;
      nameInput.value = computer.name;
      descriptionInput.value = computer.description;
      priceInput.value = computer.price;
      newSelect.value = computer.new;
      imageInput.value = computer.img;
      ramInput.value = computer.ram;
      cpuInput.value = computer.cpu;
      romInput.value = computer.rom;
      romTypeSelect.value = computer.romType;
      operationSystemInput.value = computer.operatingSystem;
      videoCartInput.value = computer.videoCard;
      imageInForm.src = computer.img;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Do you want delete computer?")) {
        user.computers.splice(index, 1);
        localStorage.setItem("user", JSON.stringify(user));
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.forEach((item, index) => {
          if (item.id == user.id) {
            users[index] = user;
          }
        });
        localStorage.setItem("users", JSON.stringify(users));
        render();
      }
    });
    tdOperations.append(editBtn, deleteBtn);

    tr.append(tdId, tdName, tdImage, tdPrice, tdOperations);
    document.querySelector(".tbody").append(tr);
  });
}

render();

(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          if (formMode == "addNewComputer") {
            addNewComputer();
          } else if (formMode == "editComputer") {
            editComputer();
          }
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function addNewComputer() {
  const newComputer = {
    id: Math.random(),
    category: categotyInput.value,
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    new: newSelect.value,
    img: imageInput.value,
    ram: ramInput.value,
    cpu: cpuInput.value,
    rom: romInput.value,
    romType: romTypeSelect.value,
    operatingSystem: operationSystemInput.value,
    videoCard: videoCartInput.value,
  };
  const user = JSON.parse(localStorage.getItem("user") || '{"computers": []}');
  user.computers.push(newComputer);
  localStorage.setItem("user", JSON.stringify(user));

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.forEach((item, index) => {
    if (item.id == user.id) {
      users[index] = user;
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
}

function editComputer() {
  const computerForEdit = {
    id: computerIdForEdit,
    category: categotyInput.value,
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    new: newSelect.value,
    img: imageInput.value,
    ram: ramInput.value,
    cpu: cpuInput.value,
    rom: romInput.value,
    romType: romTypeSelect.value,
    operatingSystem: operationSystemInput.value,
    videoCard: videoCartInput.value,
  };
  const user = JSON.parse(localStorage.getItem("user") || '{"computers": []}');
  user.computers.forEach((computer, index) => {
    if (computer.id == computerForEdit.id) {
      user.computers[index] = computerForEdit;
    }
  });
  localStorage.setItem("user", JSON.stringify(user));

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.forEach((item, index) => {
    if (item.id == user.id) {
      users[index] = user;
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
}

document.querySelector(".addNewCompBtn").addEventListener("click", () => {
  document.querySelector(".form").reset();
  formMode = "addNewComputer";
  document.querySelector(".computerFormTitle").textContent = "New Computer";
  imageInForm.src = "";
});

imageInput.addEventListener("input", () => {
  imageInForm.src = imageInput.value;
});
