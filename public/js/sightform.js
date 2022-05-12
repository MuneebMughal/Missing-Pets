const addSightingBtn = document.getElementById("addSightingBtn");
const sightingForm = document.getElementById("sighting-form");
const roadName = document.getElementById("road-name");
const formBtn = document.getElementById("formbtn");
const area = document.getElementById("area");
let id = "";
addSightingBtn.addEventListener("click", () => {
  addSightingBtn.style.display = "none";
  sightingForm.style.display = "block";
});
formBtn.addEventListener("click", addSighting);
function addSighting(e) {
  id = e.target.parentNode.getAttribute("id");
  if (!validateForm()) {
    sightingForm.scrollIntoView({
      behavior: "smooth",
    });
    return;
  } else {
    postSighting();
  }
}
function validateForm() {
  error.innerHTML = "";
  error.style.display = "none";
  if (!roadName.value) {
    error.innerHTML = "Road name is required.";
    error.style.display = "block";
    return false;
  }
  if (!area.value) {
    error.innerHTML = "Area is required.";
    error.style.display = "block";
    return false;
  }
  return true;
}
function postSighting() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:5000/api/sighting/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      road_name: roadName.value,
      area: area.value,
    })
  );
  xhr.onload = function () {
    clearForm();
    if (xhr.status === 200) {
      success.innerHTML = "Sighting Added Succussfully.";
      success.style.display = "block";
      sightingForm.scrollIntoView({
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
      sightingForm.scrollIntoView({
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
  roadName.value = "";
  area.value = "";
}
