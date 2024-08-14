let search_input = document.getElementById("search_input");

let current_day = document.getElementById("current_day");
let current_Date = document.getElementById("current_Date");
let city = document.getElementById("city");
let current_max_temp = document.getElementById("current_max_temp");
let status_img = document.getElementById("status_img");
let current_status = document.getElementById("current_status");
let humidity = document.getElementById("humidity");
let wind_kph = document.getElementById("wind_kph");
let wind_dir = document.getElementById("wind_dir");
let nextDay = document.getElementById("nextDay");
let nextDay_icon = document.getElementById("nextDay_icon");
let next_max_temp = document.getElementById("next_max_temp");
let next_min_temp = document.getElementById("next_min_temp");
let next_status = document.getElementById("next_status");
let afterNextDay = document.getElementById("afterNextDay");
let afterNextDay_icon = document.getElementById("afterNextDay_icon");
let afterNext_max_temp = document.getElementById("afterNext_max_temp");
let afterNext_min_temp = document.getElementById("afterNext_min_temp");
let afterNext_status = document.getElementById("afterNext_status");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = new Date().getDay();
let month = new Date().getMonth();
let dayName = new Date().getDate();
console.log(dayName);

search_input.addEventListener("keyup", function () {
  fetchApi(search_input.value);
});

async function fetchApi(city) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=20b5423eb47a45d185984307232402&q=${city}&days=3`
  );
  let res = await data.json();
  displayCurrent(res.current, res.location.name);
  displayNextDay(res.forecast.forecastday[1]);
  displayAfterNext(res.forecast.forecastday[2])
  console.log(res);
}

fetchApi("cairo");

function displayCurrent(current, city) {
  let cartona = ``;

  cartona += `
    <div class="card">
    <div class="card-header p-0 px-2">
      <div
        class="d-flex justify-content-between align-items-center pt-1"
      >
        <p id="current_day">${days[day]}</p>
        <p id="current_Date">${dayName}${months[month]}</p>
      </div>
    </div>
    <div class="card-body pb-4">
      <span id="city">${city}</span>
      <div class="d-flex mb-3">
        <h2 class="text-white me-5" id="current_max_temp">
          ${current.temp_c}<sup>o</sup>C
        </h2>
        <img
          src=${current.condition.icon}
          class="w-25"
          alt=""
          srcset=""
          id="status_img"
        />
      </div>
      <span class="custom" id="current_status">${current.condition.text}</span>
      <div class="d-flex my-3">
        <div class="flex">
          <img
            src="./images/icon-umberella.png"
            class="me-1"
            alt=""
            srcset=""
            id="humidity_icon"
          />
          <span id="humidity">${current.humidity}%</span>
        </div>
        <div class="flex mx-3">
          <img
            src="./images/icon-wind.png"
            class="me-1"
            alt=""
            srcset=""
            id="wind_kph_icon"
          />
          <span id="wind_kph">${current.wind_kph}km/h</span>
        </div>
        <div class="flex">
          <img
            id="wind_dir_icon"
            src="./images/icon-compass.png"
            class="me-1"
            alt=""
            srcset=""
          />
          <span id="wind_dir">${current.wind_dir}</span>
        </div>
      </div>
    </div>
  </div>
    
    
    `;

  document.getElementById("currentCard").innerHTML = cartona;
}

function displayNextDay(nextDayObj) {
  
console.log(nextDayObj);

let obj = new Date()
console.log(obj);

let dayIndex = new Date(nextDayObj.date).getDay()
console.log(days[dayIndex]);


let cartona = `
`

cartona +=`

<div class="card sec_card">
<div class="card-header p-0 px-2 pt-1">
  <div class="d-flex justify-content-center">
    <p id="nextDay">${days[dayIndex]}</p>
  </div>
</div>
<div class="card-body py-5">
  <div class="d-flex flex-column align-items-center">
    <img
      id="nextDay_icon"
      src=${nextDayObj.day.condition.icon}
      class="img-fluid mb-3"
      alt=""
      srcset=""
    />
    <h4 class="text-white" id="next_max_temp">${nextDayObj.day.maxtemp_c}<sup>o</sup>C</h4>
    <span class="text-white" id="next_min_temp"
      >${nextDayObj.day.mintemp_c}<sup>o</sup></span
    >
    <span class="custom mt-4" id="next_status">${nextDayObj.day.condition.text}</span>
  </div>
</div>
</div>
`

document.getElementById("nextDay_card").innerHTML=cartona
}

function displayAfterNext(afterNextObj){
  
    let indexDay = new Date(afterNextObj.date).getDay()

    let cartona = ``

    cartona +=`
    
    <div class="card">
    <div class="card-header p-0 px-2 pt-1">
      <div class="d-flex justify-content-center">
        <p class="afterNextDay">${days[indexDay]}</p>
      </div>
    </div>
    <div class="card-body py-5">
      <div class="d-flex flex-column align-items-center">
        <img
          id="afterNextDay_icon"
          src=${afterNextObj.day.condition.icon}
          class="img-fluid mb-3"
          alt=""
          srcset=""
        />
        <h4 class="text-white" id="afterNext_max_temp">
        ${afterNextObj.day.maxtemp_c}<sup>o</sup>C
        </h4>
        <span class="text-white" id="afterNext_min_temp"
          > ${afterNextObj.day.mintemp_c}<sup>o</sup></span
        >
        <span class="custom mt-4" id="afterNext_status">${afterNextObj.day.condition.text}</span>
      </div>
    </div>
  </div>
    
    `
    document.getElementById("afterNextDay_card").innerHTML=cartona 
}