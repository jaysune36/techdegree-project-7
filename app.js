
const divCreate = document.createElement('div');
const ulCreate = document.createElement('ul');
const messenger = document.getElementById('messenger');
const inputSearch = document.querySelector('.message-user-contain input');
const userInfo = document.getElementById('notify-bell')
const alertDiv = document.querySelector('.alert');
const ctxLine = document.getElementById('lineChart');
const ctxBar = document.getElementById('barChart');
const ctxPie = document.getElementById('pieChart');
const traffic = document.getElementById('traffic');
const userSearch = document.getElementById('user-search');
const dailyTrafficData = [60, 105, 165, 125, 225, 200, 100]
const dailyTrafficLabel = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const mobileUserData = [70, 15, 15];
const mobileUserLabel = ['Desktop', 'Tablet', 'Phones']
const hourTrafData = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
  2500];
const dailyTrafData = [650, 1050, 900, 1700, 1900, 2100, 2050, 2150, 200, 900];
const weeklyTrafData = [850, 1350, 900, 1800, 1700, 900, 850, 2200, 2300, 2350];
const monthlyTrafData = [950, 1050, 1900, 800, 1750, 600, 800, 2100, 2200, 2450];
const hourTrafLabel = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
const dailyTrafLabel = ['17-24', '9-12', '2-5', '19-4', '20-7', '6-15', '10-19', '29-10', '1-9', '8-13'];
const weeklyTrafLabel = ['Mon-Tues', 'Tues-Wed', 'Wed-Thur', 'Thur-Fri', 'Fri-Sat', 'Sat-Sun', 'Sun-Mon', 'Mon-Tues', 'Tues-Wed', 'Wed-Thur'];
const monthlyTrafLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct'];

function alertMessage() {
  alertDiv.innerHTML = `<h2><b>Alert</b>: You have unread messages</h2><span class='close'>&times;</span>`;
}

window.onload = alertMessage();

let trafficData = {
  labels: hourTrafLabel,
  datasets: [{
    data: hourTrafData,
    backgroundColor: "rgba(217,209,234, 0.8)",
    borderColor: "#AA99D6",
    borderWidth: 1,
    fill: true,
    lineTension: 0.4
  }]
}

let trafficOptions = {
  aspectRatio: 2.5,
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

function updateLineChart(chart, chartLabel, chartData) {
  chart.data.labels = chartLabel;
  chart.data.datasets[0].data = chartData;
  chart.update();
}

let lineChart = new Chart(ctxLine, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
})

const barChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: dailyTrafficLabel,
    datasets: [{
      label: 'Popular JavaScript Frameworks',
      data: dailyTrafficData,
      backgroundColor: [
        "#AA99D6",
        "#AA99D6",
        "#AA99D6",
        "#AA99D6",
        "#AA99D6"
      ],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    }
  }
})

const pieChart = new Chart(ctxPie, {
  type: 'doughnut',
  data: {
    labels: mobileUserLabel,
    datasets: [{
      data: mobileUserData,
      backgroundColor: [
        "#AA99D6",
        "#00D096",
        "#00C2B4"
      ],

      borderColor: [
        "#AA99D6",
        "#00D096",
        "#00C2B4"
      ],
      borderWidth: 1
    }]
  },
  options: {
    aspectRatio: 1.5,
    layout: {
      padding: {
        left: 40
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          font: {
            weight: 'bold'
          }
        }
      }
    }
  }
})

function createLiElement(appendTo, divClassName = null, liClassName) {
  appendTo.appendChild(divCreate);
  divCreate.appendChild(ulCreate);
  divCreate.className = divClassName
  ulCreate.className = liClassName
}
// creates autocomplete drop down for user-search input
function autocompleteDropDown() {
  let inputSearchValue = userSearch.value.toLowerCase();
  const members = document.querySelectorAll('.member-text p');
  const userLabel = document.querySelector('[for=user-search]');
  createLiElement(userLabel, null ,'member-list')
  const memberListClass = document.querySelector('.member-list')
  // adds member names to varialbe if searched value 
  // matches
  let memberList = '';
  // iterates through members list of names to match 
  // against typed values
  for(let i=0; i<members.length; i++) {
    let member = members[i];
    let memberName = member.textContent
    if(inputSearchValue !== '') {
      if(memberName.toLowerCase().includes(inputSearchValue)) {
        memberList += `<li>${memberName}</li>`;
      }
     }
  }
  // if memeber list is empty will not display
  if(memberList !== '') {
    memberListClass.style.display = 'block';
    inputSearch.style.marginBottom = '0';
    inputSearch.style.borderRadius = '5px 5px 0 0'
    memberListClass.innerHTML = memberList;
  } else {
    memberListClass.style.display = 'none'
    inputSearch.style.marginBottom = '1em';
    inputSearch.style.borderRadius = '5px'
  }
}

userInfo.addEventListener('click', (e) => {
  const notifyList = document.querySelector('.notify-container');
  const notification = document.querySelector('.notification');
    if (e.target.id === 'bell-svg') {
      if(notifyList.style.display === 'none') {
      notifyList.style.display = 'block';
      } else {
      notifyList.style.display = 'none';
      }
    }
})

alertDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    if (e.target.className === 'close') {
      let h2 = e.target.parentNode;
      let alert = h2.parentNode;
      alert.removeChild(h2);
    }
  }
})

traffic.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
      const li = e.target;
      const trafficLinks = document.getElementsByClassName('traffic-link');
      for (let i = 0; i < trafficLinks.length; i++) {
        let trafficLink = trafficLinks[i];
        trafficLink.className = 'traffic-link';
    }
    li.className += ' active'
    if(li.textContent === 'Hourly') {
      updateLineChart(lineChart, hourTrafLabel, hourTrafData)
    } else if(li.textContent === 'Daily') {
      updateLineChart(lineChart, dailyTrafLabel, dailyTrafData)
    } else if(li.textContent === 'Weekly') {
      updateLineChart(lineChart, weeklyTrafLabel, weeklyTrafData)
    } else if(li.textContent === 'Monthly') {
      updateLineChart(lineChart, monthlyTrafLabel, monthlyTrafData)
    }
  }
})

userSearch.addEventListener('keyup', ()=> {
  autocompleteDropDown();
})
messenger.addEventListener('mouseover', (e)=> {
  if(e.target.tagName === 'LI') {
    let li = e.target;
    let liValue = li.textContent;
    let userValue = userSearch.value;
    userValue = ''
    userValue = liValue;
    console.log(userValue)
  }
})

messenger.addEventListener('click', (e)=> {
  if(e.target.tagName === 'LI') {
    let li = e.target;
    let liValue = li.textContent;
    let userValue = userSearch.value
    userValue = liValue;
    console.log(userValue)
    const memberListClass = document.querySelector('.member-list');
    memberListClass.style.display = 'none';
    inputSearch.style.marginBottom = '1em';
    inputSearch.style.borderRadius = '5px'
  }
})