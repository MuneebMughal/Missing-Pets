const petName = document.getElementById("name");
const animal = document.getElementById("animal");
const description = document.getElementById("description");
const loc = document.getElementById("location");
const formbtn = document.getElementById("formbtn");
const error = document.getElementById("error");
const success = document.getElementById("success");
const reportForm = document.querySelector(".report-form");
const updateBtn = document.querySelectorAll(".updateBtn");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const reportFormElem = document.getElementById("report-from");
let update = false;
let Id = "";
formbtn.addEventListener("click", addOrUpdateReport);
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", deleteReport);
});
updateBtn.forEach((btn) => {
  btn.addEventListener("click", updateReport);
});
function addOrUpdateReport() {
  if (!validateForm()) {
    reportForm.scrollIntoView({
      behavior: "smooth",
    });
    return;
  } else {
    if (!update) {
      postReport();
    } else {
      updateReportForm();
    }
  }
}
function validateForm() {
  error.innerHTML = "";
  error.style.display = "none";
  if (!petName.value) {
    error.innerHTML = "Name is required.";
    error.style.display = "block";
    return false;
  }
  if (!animal.value) {
    error.innerHTML = "Animal is required.";
    error.style.display = "block";
    return false;
  }
  if (!description.value) {
    error.innerHTML = "Description is required.";
    error.style.display = "block";
    return false;
  } else {
    if (description.value.length < 20) {
      error.innerHTML = "Description must be 20 characters long.";
      error.style.display = "block";
      return false;
    }
  }
  if (!loc.value) {
    error.innerHTML = "Location is required.";
    error.style.display = "block";
    return false;
  }
  return true;
}
function postReport() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5001/api/report");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name: petName.value,
      animal: animal.value,
      description: description.value,
      location: loc.value,
    })
  );
  xhr.onload = function () {
    clearForm();
    if (xhr.status === 200) {
      success.innerHTML = "Report Added Succussfully.";
      success.style.display = "block";
      reportForm.scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        success.style.display = "none";
        success.innerHTML = "";
        location.reload();
      }, 3000);
    } else {
      error.innerHTML = "Something went wrong.";
      error.style.display = "block";
      reportForm.scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        error.style.display = "none";
        error.innerHTML = "";
      }, 3000);
    }
  };
}
function clearForm() {
  petName.value = "";
  loc.value = "";
  description.value = "";
  animal.value = "";
}
function deleteReport(e) {
  const id = e.target.parentNode.getAttribute("id");
  if (window.confirm("Are you Sure?")) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:5001/api/report/${id}`);
    xhr.send();
    xhr.onload = () => {
      location.reload();
    };
  }
}
function updateReport(e) {
  Id = e.target.parentNode.getAttribute("id");
  setFormData();
}
function setFormData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:5001/api/report/${Id}`);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const { data } = JSON.parse(this.response);
      petName.value = data.name;
      animal.value = data.animal;
      description.value = data.description;
      loc.value = data.location;
      reportForm.scrollIntoView({
        behavior: "smooth",
      });
      const btnElem = document.createElement("div");
      const btn = document.createElement("button");
      btn.innerText = "Cancel";
      btn.setAttribute("id", "cancelBtn");
      btn.setAttribute("type", "button");
      btn.addEventListener("click", cancelUpdate);
      btnElem.setAttribute("id", "cancelElem");
      btnElem.classList.add("form-item");
      btnElem.appendChild(btn);
      reportFormElem.appendChild(btnElem);
      update = true;
    }
  };
}
function cancelUpdate() {
  clearForm();
  const cancelElem = document.getElementById("cancelElem");
  const cancelBtn = document.getElementById("cancelBtn");
  reportFormElem.removeChild(cancelElem);
  update = false;
  cancelBtn.removeEventListener("click", cancelUpdate);
}
function updateReportForm() {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:5001/api/report/${Id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name: petName.value,
      animal: animal.value,
      description: description.value,
      location: loc.value,
    })
  );
  xhr.onload = function () {
    clearForm();
    if (xhr.status === 200) {
      success.innerHTML = "Report Updated Succussfully.";
      success.style.display = "block";
      reportForm.scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        success.style.display = "none";
        success.innerHTML = "";
        location.reload();
      }, 3000);
      update = false;
      const cancelElem = document.getElementById("cancelElem");
      reportFormElem.removeChild(cancelElem);
    } else {
      error.innerHTML = "Something went wrong.";
      error.style.display = "block";
      reportForm.scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        error.style.display = "none";
        error.innerHTML = "";
      }, 3000);
    }
  };
}
