let ctx = document.getElementById("myChart").getContext("2d");

let getCountry = document.querySelector(".country-get");
let getFromDate = document.querySelector('.from-get');
let getToDate = document.querySelector('.to-get');

let goBtn = document.querySelector(".go-btn");
let reload = document.querySelector('#reload');

reload.addEventListener('click', reloadPage);

function reloadPage(e){
    location.reload();
}

goBtn.addEventListener("click", run);

function run(e) {
  let url = "";
  let c = getCountry.value;
  let value = c.toLowerCase();
  getCountry.value = "";

  url = `https://api.covid19api.com/country/${value}/status/confirmed/live?from=${getFromDate.value}T00:00:00Z&to=${getToDate.value}T00:00:00Z`;

  async function getData() {
    let response = await fetch(url);
    let d = await response.json();

    let date_list = [];
    let case_list = [];
    let country_name = d[0]["Country"];
    for (let i = 0; i < d.length; i++) {
      const monthNames = [
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
      var date = new Date(d[i]["Date"]);
      var month_num = date.getMonth();
      let date_string = ` ${
        monthNames[month_num]
      } ${date.getDate()}, ${date.getFullYear()}`;
      date_list.push(date_string);

      case_list.push(parseInt(d[i]["Cases"]));
    }

    var chart = new Chart(ctx, {
      zoomEnabled: true,
      type: "line",

      data: {
        labels: date_list,
        datasets: [
          {
            label: country_name,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "#3b5998",
            data: case_list,
          },
        ],
      },

      options: {
        // scales: {
        //     yAxes: [
        //         {
        //             ticks: {
        //                 callback: function(value, index, values){
        //                     // return value + ' cases';
        //                     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //                 }
        //             }
        //         }
        //     ]
        // }
      },
    });
  }

  getData();
}
