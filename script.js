const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imgListWrapper = document.querySelector(".imagelist-wrapper");

runEventListener();

function runEventListener() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear(e) {
  searchInput.value = "";
  Array.from(imgListWrapper.children).forEach((child) => child.remove());
  e.preventDefault();
}

function search(e) {
  imgListWrapper.innerHTML = "";
  const value = searchInput.value.trim();
  e.preventDefault();

  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID kRpF-HigeCUzCwi2bX8ljjshB-CCRhsbfx2TSCs4Rxs",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((image) => {
        addImageToUI(image.urls.small);
      });
    })
    .catch((err) => console.log(err));
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.appendChild(img);
  imgListWrapper.appendChild(div);
  searchInput.value = "";
}
