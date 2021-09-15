document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    alertMessage();
    savedSettings();
  })
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
  const settings = document.getElementById('settings');
  // adds member names to varialbe if searched value 
  // matches
  let memberList = '';
  // boolean to watch if notification window in open
  let notifyWindow = false;
  // line, bar, and pie object for chart data and labels 
  const chartDataLabels = {
    data: {
      lineChart: {
        hourlyData: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
          2500],
        dailyData: [650, 1050, 900, 1700, 1900, 2100, 2050, 2150, 200, 900],
        weeklyData: [850, 1350, 900, 1800, 1700, 900, 850, 2200, 2300, 2350],
        monthlyData: [950, 1050, 1900, 800, 1750, 600, 800, 2100, 2200, 2450]
      },
      barChart: {
        data: [60, 105, 165, 125, 225, 200, 100]
      },
      pieChart: {
        data: [70, 15, 15]
      }
    },
    label: {
      lineChart: {
        hourlyLabel: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
        dailyLabel: ['17-24', '9-12', '2-5', '19-4', '20-7', '6-15', '10-19', '29-10', '1-9', '8-13'],
        weeklyLabel: ['Mon-Tues', 'Tues-Wed', 'Wed-Thur', 'Thur-Fri', 'Fri-Sat', 'Sat-Sun', 'Sun-Mon', 'Mon-Tues', 'Tues-Wed', 'Wed-Thur'],
        monthlyLabel: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct']
      },
      barChart: {
        label: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      },
      pieChart: {
        label: ['Desktop', 'Tablet', 'Phones']
      }
    }
  }
  //trafficData to set labels and data with stylings for 
  // line chart
  let trafficData = {
    labels: chartDataLabels.label.lineChart.hourlyLabel,
    datasets: [{
      data: chartDataLabels.data.lineChart.hourlyData,
      backgroundColor: "rgba(217,209,234, 0.8)",
      borderColor: "#AA99D6",
      borderWidth: 1,
      fill: true,
      lineTension: 0.4
    }]
  }
  //trafficOptions object to set with plugins and settings 
  // for line chart
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
  // sets initial lineChart graph
  let lineChart = new Chart(ctxLine, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
  })
  // sets bar Chart graph
  const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: chartDataLabels.label.barChart.label,
      datasets: [{
        label: 'Popular JavaScript Frameworks',
        data: chartDataLabels.data.barChart.data,
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
  // sets pie Chart graph
  const pieChart = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
      labels: chartDataLabels.label.pieChart.label,
      datasets: [{
        data: chartDataLabels.data.pieChart.data,
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

  function alertMessage() {
    alertDiv.innerHTML = `<h2><b>Alert</b>: You have unread messages</h2><span class='close'>&times;</span>`;
  }
  //resets layout of the user input search field
  function resetUserSearchLayout(marginBottom, borderRadius) {
    inputSearch.style.marginBottom = marginBottom;
    inputSearch.style.borderRadius = borderRadius;
  }
  function updateLineChart(chart, chartLabel, chartData) {
    chart.data.labels = chartLabel;
    chart.data.datasets[0].data = chartData;
    chart.update();
  }
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
    createLiElement(userLabel, null, 'member-list')
    let memberList = '';
    const memberListClass = document.querySelector('.member-list');
    // iterates through members list of names to match 
    // against typed values
    for (let i = 0; i < members.length; i++) {
      let member = members[i];
      let memberName = member.textContent
      if (inputSearchValue !== ' ') {
        if (memberName.toLowerCase().includes(inputSearchValue)) {
          memberList += `<li>${memberName}</li>`;
        }
      } 
    }
    // if memeber list is empty will not display
    if (memberList !== '') {
      memberListClass.style.display = 'block';
      memberListClass.innerHTML = memberList;
      resetUserSearchLayout('0', '5px 5px 0 0');
    } else {
      resetUserSearchLayout('1em', '5px');
      memberListClass.style.display = 'none';
    }
  }
  function savedSettings() {
    const timeZone = settings.querySelector('select');
    const emailNotify = settings.querySelector('.email-notify input');
    const profilePublic = settings.querySelector('.profile-public input');
    if(localStorage.getItem('timeZone')) {
    timeZone.value = localStorage.getItem('timeZone');
    } else {
      return timeZone.selectedIndex = 0;
    }
    emailNotify.checked = JSON.parse(localStorage.getItem('emailNotify'))
    profilePublic.checked = JSON.parse(localStorage.getItem('profilePublic'))
  }
  userInfo.addEventListener('click', (e) => {
    const notifyListContain = document.querySelector('.notify-container');
    const notification = document.querySelector('.notification');
    if (e.target.id === 'bell-svg') {
      if (notifyWindow === false) {
        notification.style.backgroundColor = '#AA99D6';
        notifyListContain.style.display = 'block'
        notifyWindow = true;
      } else {
        notifyListContain.style.display = 'none'
        notifyWindow = false
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
      if (li.textContent === 'Hourly') {
        updateLineChart(lineChart, chartDataLabels.label.lineChart.hourlyLabel, chartDataLabels.data.lineChart.hourlyData)
      } else if (li.textContent === 'Daily') {
        updateLineChart(lineChart, chartDataLabels.label.lineChart.dailyLabel, chartDataLabels.data.lineChart.dailyData)
      } else if (li.textContent === 'Weekly') {
        updateLineChart(lineChart, chartDataLabels.label.lineChart.weeklyLabel, chartDataLabels.data.lineChart.weeklyData)
      } else if (li.textContent === 'Monthly') {
        updateLineChart(lineChart, chartDataLabels.label.lineChart.monthlyLabel, chartDataLabels.data.lineChart.monthlyData)
      }
    }
  })

  userSearch.addEventListener('keyup', () => {
    return autocompleteDropDown();
  })
  messenger.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'LI') {
      let li = e.target;
      let liValue = li.textContent;
      let inputValue = li.parentNode.parentNode.parentNode.previousElementSibling
      inputValue.value = ''
      inputValue.value = liValue
    }
  })

  messenger.addEventListener('click', (e) => {
    let event = e.target;
    const memberListClass = document.querySelector('.member-list');
    if(event.id !== 'member-list') {
      memberListClass.style.display = 'none';
      resetUserSearchLayout('1em', '5px');
    }
    if (event.tagName === 'LI') {
      memberListClass.style.display = 'none';
      resetUserSearchLayout('1em', '5px');
    }
    if (event.tagName === 'BUTTON') {
      e.preventDefault()
      if (event.type = 'submit') {
        const userInput = userSearch.value;
        const messageField = messenger.querySelector('textarea')
        if (!messageField.value && !userInput) {
          alert('Pleae enter a User and Message to send')
        } else if (messageField.value && userInput) {
          alert('Message Sent!')
          let input = event.previousElementSibling.previousElementSibling.previousElementSibling
          let textArea = event.previousElementSibling
          input.value = '';
          textArea.value = '';
        } else if (!userInput) {
          alert('Pleae enter a User to send Message to')
        } else if (!messageField.value) {
          alert('Pleae enter a Message to send to User')
        }
      }
    }
  })

  settings.addEventListener('click', (e) => {
    let event = e.target;
    const timeZone = settings.querySelector('select');
        const emailNotify = settings.querySelector('.email-notify input');
        const profilePublic = settings.querySelector('.profile-public input');
    console.log(event)
    if (event.tagName === 'BUTTON') {
      if (event.textContent === 'SAVE') {
        localStorage.setItem('timeZone', timeZone.value)
        localStorage.setItem('emailNotify', emailNotify.checked)
        localStorage.setItem('profilePublic', profilePublic.checked)
      }
      if(event.textContent === 'CANCEL') {
        timeZone.selectedIndex = 0;
        emailNotify.checked = false;
        profilePublic.checked = false;
        localStorage.clear()
        console.log(timeZone)
      }
    }
  })
})