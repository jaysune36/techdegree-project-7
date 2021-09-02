const alertDiv = document.querySelector('.alert');
const ctxLine = document.getElementById('lineChart');
const ctxBar = document.getElementById('barChart');
const ctxPie = document.getElementById('pieChart');
const traffic = document.getElementById('traffic');
let stars = [135850, 52122, 148825, 16939, 9763];
let frameworks = ["React", "Angular", "Vue", "Hyperapp", "Omi"];
let dailyTrafficData = [60, 105, 165, 125, 225, 200, 100]
let dailyTrafficLabel = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let mobileUserData = [70, 15, 15];
let mobileUserLabel = ['Desktop', 'Tablet', 'Phones']
let hourTrafData = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
  2500];
let DailyTrafData = [];
let WeeklyTrafData = [];
let MontlyTrafData = [];
let hourTrafLabel = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
let DailyTrafLabel = [];
let WeeklyTrafLabel = [];
let MontlyTrafLabel = [];

function alertMessage() {
  alertDiv.innerHTML = `<h2><b>Alert</b>: You have unread messages</h2><span class='close'>&times;</span>`;
}

window.onload = alertMessage();

const lineChart = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: hourTrafLabel,
    datasets: [{
      data: hourTrafData,
      backgroundColor: "rgba(217,209,234, 0.8)",
      borderColor: "#AA99D6",
      borderWidth: 1,
      fill: true,
      lineTension: 0.4
    }]
  },
  options: {
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

alertDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    if (e.target.className === 'close') {
      let h2 = e.target.parentNode;
      let alert = h2.parentNode;
      const notification = document.querySelector('.notification')
      alert.removeChild(h2);
      notification.style.display = 'none'
    }
  }
})

traffic.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
      const li = e.target;
      const trafficLinks = document.getElementsByClassName('traffic-link');
      for (let i = 0; i < trafficLinks.length; i++) {
        let trafficLink = trafficLinks[i];
        if (li.className === 'traffic-link') {
          trafficLink.className += ' active'
        } else {
          trafficLink.classList.remove('active');
        }
    }
  }
})
