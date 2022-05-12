const searchbar = document.getElementById("searchbar");
const searchContainer = document.getElementById("search-container");
let reports = [];
getAllReports();
searchbar.addEventListener("input", (e) => {
  renderSearchResult(e.target.value);
});

function getAllReports() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5001/api/reports");
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      const { data } = JSON.parse(this.response);
      reports = data;
    }
  };
}
function renderSearchResult(val) {
  if (val === "") {
    searchContainer.innerHTML = "";
    searchContainer.style.display = "none";
    return;
  }
  const filteredReports = reports.filter((rep) => {
    return (
      rep.name.trim().toLowerCase().includes(val.toLowerCase()) && val !== ""
    );
  });
  if (filteredReports.length > 0) {
    searchContainer.innerHTML = "";
    searchContainer.style.display = "flex";
    searchContainer.scrollIntoView({
      behavior: "smooth",
    });
    filteredReports.map((rep) => {
      console.log(rep);
      searchContainer.innerHTML += `
          <div class="card">
          <a href='http://localhost:5001/report/${rep.id}'>
            <h2><span class="black">Name:</span> ${rep.name}</h2>
            <h3><span class="black">Animal:</span> ${rep.animal}</h3>
            <h3><span class="black">Location:</span> ${rep.location}</h3>
            <h4><span class="black">Description</span></h4>
            <p>${rep.description}</p>
          </a>
        </div>
          `;
    });
  }
}
