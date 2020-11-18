let url =
  "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";

let total_url = "https://api.covid19api.com/world/total";

let screen = document.querySelector(".screen");

let confirmed = document.getElementById("confirm");
let active = document.getElementById("active");
let recovered = document.getElementById("recovered");
let dead = document.getElementById("dead");

async function getAllData() {
  let response = await fetch(url);
  let d = await response.json();

  let response_total = await fetch(total_url);
  let t = await response_total.json();

  let total_confirmed = parseInt(t["TotalConfirmed"]);
  let total_death = parseInt(t["TotalDeaths"]);
  let total_recovered = parseInt(t["TotalRecovered"]);
  let total_active = total_confirmed - total_death;

//   confirmed.textContent = total_confirmed;
//   active.textContent = total_active;
//   recovered.textContent = total_recovered;
//   dead.textContent = total_death;

  confirmed.textContent = total_confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  active.textContent = total_active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  recovered.textContent = total_recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  dead.textContent = total_death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;

  for (let i = 0; i < d.length; i++) {
    screen.appendChild(document.createElement("div"));
    let box = screen.children[i];
    box.className = "box";
    let head = box.appendChild(document.createElement("h4"));
    head.textContent = d[i]["country"];
    let count = box.appendChild(document.createElement("p"));
    count.textContent = d[i]["infected"];
  }
}

getAllData();
