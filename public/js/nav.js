const hamburger = document.querySelector(".hamburger");
const nav_items = document.querySelector(".nav_items");
const link_comps = document.querySelectorAll(".link_comp");
hamburger.addEventListener("click", () => {
  nav_items.classList.toggle("show");
});
link_comps.forEach((link) => {
  link.addEventListener("click", () => {
    nav_items.classList.remove("show");
  });
});
