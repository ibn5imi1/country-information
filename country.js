const loaderContainer = document.querySelector(".loader-container")
const header = document.querySelector("header");
const mood = document.querySelector(".mood");
const moodIcon = document.querySelector(".mood i");
const backBtnContainer = document.querySelector(".back-btn");
const backBtn = document.querySelector(".back-btn button");
const countryContainer = document.querySelector(".country-container");
const main = document.querySelector("main");
const borders = document.querySelector(".borders");

// loader
window.addEventListener("load", () => {
  loaderContainer.style.display = 'none';
});


let defaultMood = "light";
mood.onclick = () => {
  if (defaultMood === "light") {
    defaultMood = "dark";
    moodIcon.className = "";
    moodIcon.classList.add("fa-regular", "fa-moon");
    document.querySelector("body").style.backgroundColor = "#202d36"
    header.classList.add("dark");
    backBtn.classList.add("dark");
    countryContainer.classList.add("dark");
    borders.classList.add("dark");
  } else if (defaultMood === "dark") {
    defaultMood = "light";
    moodIcon.className = "";
    moodIcon.classList.add("fa-solid", "fa-moon");
    document.querySelector("body").style.backgroundColor = "#fafafa"
    header.classList.remove("dark");
    backBtn.classList.remove("dark");
    countryContainer.classList.remove("dark");
    borders.classList.remove("dark");
  }
}


backBtnContainer.onclick = () => {
  window.location.href = "index.html";
}


// get all data
function getData() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
      let data = JSON.parse(myRequest.responseText).filter((country) =>
        country.alpha3Code === localStorage.getItem("countryCode").slice(1, -1));

      showDataCountry(data);
    }
  };
  myRequest.open("GET", "data.json", true);
  myRequest.send();
}
getData();

function showDataCountry(data) {
  // set title
  document.querySelector("title").innerHTML = data[0].name;

  let langs = "";
  for (let i = 0; i < data[0].languages.length; i++) {
    langs += " " + data[0].languages[i].name + ","
  }

  let countriesBorder = "";
  if (data[0].borders !== undefined) {
    for (let i = 0; i < data[0].borders.length; i++) {
      countriesBorder += " " + `<div onclick="goCountry('${data[0].borders[i]}')" class="border">${data[0].borders[i]}</div>`
    }
  } else {
    countriesBorder += "Without Countries Border"
  }

  countryContainer.innerHTML = "";
  borders.innerHTML = "";
  countryContainer.innerHTML = `
    <div class="flag">
            <img src=${data[0].flags.png} alt="" />
          </div>
          <div class="info">
            <div class="left">
              <h2>${data[0].name}</h2>
              <h3>Native Name: <span>${data[0].nativeName}</span></h3>
              <h3>Population: <span>${data[0].population}</span></h3>
              <h3>Region: <span>${data[0].region}</span></h3>
              <h3>Sub Region: <span>${data[0].subregion}</span></h3>
              <h3>Capital: <span>${data[0].capital}</span></h3>
            </div>
            <div class="right">
              <h3>Top Level Domain: <span>${data[0].topLevelDomain}</span></h3>
              <h3>Currencies: <span>${data[0].currencies[0].name}</span></h3>
              <h3>Language: <span>${langs.slice(0, langs.length - 1)}</span></h3>
            </div>
          </div>
    `
  borders.innerHTML = `<h3>Border Countries:</h3>
          <div class="border-countries">
            ${countriesBorder}
          </div>`
}


function goCountry(code) {
  localStorage.setItem("countryCode", '"' + code + '"');
  window.location.reload();
}



