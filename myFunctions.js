const openModel = document.querySelectorAll(".show-modal");
const modals = document.querySelectorAll(".modal");
const overlay = document.querySelector(".overlay");
const closeButtons = document.querySelectorAll(".close-modal");
const mod = document.querySelector(".mod");
const showModal = (modal) => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const showModal_select = () => {
  mod.classList.remove("hidden");
};

const hideModals = () => {
  modals.forEach((modal) => modal.classList.add("hidden"));
  overlay.classList.add("hidden");
  mod.classList.add("hidden");
};

openModel.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.id;
    const modalToShow = document.getElementById(`0${modalId}`);
    console.log(modalToShow);
    if (modalToShow) {
      showModal(modalToShow);
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", hideModals);
});

overlay.addEventListener("click", hideModals);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideModals();
  }
});
//
const btnNext = document.querySelector(".next");
const details = document.querySelector(".details");
btnNext.addEventListener("click", () => {
  details.classList.add("active");
});

document.querySelector(".send").addEventListener("click", function (e) {
  e.preventDefault();

  const errors = {};
  const nationalID = document.getElementById("ID");
  const fullName = document.getElementById("fullName");
  const birth = document.getElementById("birth");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");

  if (!/^\d{11}$/.test(nationalID.value.trim())) {
    errors.nationalID = "الرقم الوطني يجب أن يكون 11 خانة.";
  }

  if (
    fullName.value.trim() &&
    !/^[\u0621-\u064A\s]+$/.test(fullName.value.trim())
  ) {
    errors.fullName = "يجب أن يحتوي الاسم على أحرف هجائية فقط.";
  }

  if (birth.value.trim() && !/^\d{2}-\d{2}-\d{4}$/.test(birth.value.trim())) {
    errors.birth = "تاريخ الولادة يجب أن يكون بالتنسيق dd-mm-yyyy.";
  }

  if (phone.value.trim() && !/^(09[3-9]\d{7})$/.test(phone.value.trim())) {
    errors.phone = "رقم الموبايل غير صحيح. يجب أن يكون من Syriatel أو MTN.";
  }

  if (
    email.value.trim() &&
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value.trim())
  ) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة.";
  }

  document.getElementById("nationalIDError").innerText =
    errors.nationalID || "";
  document.getElementById("fullNameError").innerText = errors.fullName || "";
  document.getElementById("birthError").innerText = errors.birth || "";
  document.getElementById("phoneError").innerText = errors.phone || "";
  document.getElementById("emailError").innerText = errors.email || "";

  if (!errors.nationalID) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selected = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const resultDiv = document.getElementById("result");
    if (selected.length > 0) {
      resultDiv.innerHTML = `<strong>Selected Items: </strong>${selected.join(
        " <hr>"
      )}`;
    } else {
      resultDiv.innerHTML = "No items selected.";
    }

    showModal_select();
    document.querySelector(".details").reset();
  }
});
