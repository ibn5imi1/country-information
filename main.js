const loaderContainer = document.querySelector(".loader-container")
const header = document.querySelector("header");
const mood = document.querySelector(".mood");
const moodIcon = document.querySelector(".mood i");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search input");
const filter = document.querySelector(".filter");
const filtersButton = document.querySelector(".filter .options-button");
const labelChose = document.querySelector(".filter .options-button label");
const filterList = document.querySelector(".list");
const main = document.querySelector("main");
const countriesContainer = document.querySelector("main .countries-container");

// loader
window.addEventListener("load", () => {
    loaderContainer.style.display = 'none';
    countriesContainer.style.display = 'grid';
});

// for change mood
let defaultMood = "light";
mood.onclick = () => {
    if (defaultMood === "light") {
        defaultMood = "dark";
        moodIcon.className = "";
        moodIcon.classList.add("fa-regular", "fa-moon");
        document.querySelector("body").style.backgroundColor = "#202d36"
        header.classList.add("dark");
        search.classList.add("dark");
        filter.classList.add("dark");
        main.classList.add("dark");
    } else if (defaultMood === "dark") {
        defaultMood = "light";
        moodIcon.className = "";
        moodIcon.classList.add("fa-solid", "fa-moon");
        document.querySelector("body").style.backgroundColor = "#fafafa"
        header.classList.remove("dark");
        search.classList.remove("dark");
        filter.classList.remove("dark");
        main.classList.remove("dark");
    }
}

// for filter list
let defaultOptions = "none";
filtersButton.onclick = () => {
    if (defaultOptions === "none") {
        filterList.style.display = "block";
        defaultOptions = "block";
    } else if (defaultOptions === "block") {
        filterList.style.display = "none";
        defaultOptions = "none";
    }
}
document.addEventListener("click", (event) => {
    if (defaultMood == "block" &&
        !filterList.contains(event.target) ||
        !filtersButton.contains(event.target)) {
        filterList.style.display = "none";
        defaultOptions = "none";
    }
})

// get all data
function getData() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status === 200) {
            let data = JSON.parse(myRequest.responseText);
            showData(data);
            searchCountry(data);
            filterOfRegion(data);
        }
    };
    myRequest.open("GET", "data.json", true);
    myRequest.send();
}
getData(); 

// show all data
function showData(data) {
    for (let i = 0; i < data.length; i++) {
        const countryCode = encodeURIComponent(JSON.stringify(data[i].alpha3Code));
        countriesContainer.innerHTML += `<div class="box" onclick="saveCountryCode('${countryCode}')">
              <div class="flag">
              <img src='${data[i].flags.png}' alt="Here Is Flag" />
            </div>
            <div class="info">
              <h4>${data[i].name}</h4>
              <p>Population: <span>${data[i].population}</span></p>
              <p>Region: <span>${data[i].region}</span></p>
              <p>Capital: <span>${data[i].capital}</span></p>
            </div>
            </div>
          `;
    }
}

// search country
function searchCountry(data) {
    searchInput.addEventListener("input", (e) => {
        let searchingData = data.filter((country) =>
            country.name.toLowerCase()
                .slice(0, e.target.value.toLowerCase().length) === e.target.value.toLowerCase())
        countriesContainer.innerHTML = "";
        if (searchingData.length !== 0) {
            for (let i = 0; i < searchingData.length; i++) {
                const countryCode = encodeURIComponent(JSON.stringify(searchingData[i].alpha3Code));
                countriesContainer.innerHTML += `<div class="box" onclick="saveCountryCode('${countryCode}')">
              <div class="flag">
              <img src='${searchingData[i].flags.png}' alt="Here Is Flag" />
            </div>
            <div class="info">
              <h4>${searchingData[i].name}</h4>
              <p>Population: <span>${searchingData[i].population}</span></p>
              <p>Region: <span>${searchingData[i].region}</span></p>
              <p>Capital: <span>${searchingData[i].capital}</span></p>
            </div>
            </div>
          `;
            }
        } else {
            countriesContainer.innerHTML = '<p style="font-size: 40px; text-align:center; color: #888;">We Can not Find</p>';
        }
    })
}

// filter countries
function filterOfRegion(data) {
    filterList.addEventListener("click", (e) => {
        let chosenRegion = e.target.innerHTML;
        let filteringData = data.filter((country) => country.region === chosenRegion)
        countriesContainer.innerHTML = "";
        if (chosenRegion === "All") {
            showData(data);
        } else {
            for (let i = 0; i < filteringData.length; i++) {
                const countryCode = encodeURIComponent(JSON.stringify(filteringData[i].alpha3Code));
                countriesContainer.innerHTML += `<div class="box" onclick="saveCountryCode('${countryCode}')">
              <div class="flag">
              <img src='${filteringData[i].flags.png}' alt="Here Is Flag" />
            </div>
            <div class="info">
              <h4>${filteringData[i].name}</h4>
              <p>Population: <span>${filteringData[i].population}</span></p>
              <p>Region: <span>${filteringData[i].region}</span></p>
              <p>Capital: <span>${filteringData[i].capital}</span></p>
            </div>
            </div>
          `;
            }
        }
    })
}

// save name country in local storage
function saveCountryCode(code) {
    const country = JSON.parse(decodeURIComponent(code));
    localStorage.setItem("countryCode", JSON.stringify(country));
    window.location.href = "country.html";
}

