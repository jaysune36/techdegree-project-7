const alertDiv = document.querySelector('.alert');
let ctxLine = document.getElementById('lineChart');
let ctxBar = document.getElementById('barChart');
let ctxPie = document.getElementById('pieChart');
let stars = [135850, 52122, 148825, 16939, 9763];
let frameworks = ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];

function alertMessage() {
  alertDiv.innerHTML = `<h2><span class='bold'>Alert</span>: You have unread messages</h2><span class='close'>&times;</span>`;
}

window.onload = alertMessage();

const barChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
     labels: frameworks,
     datasets: [{
         label: 'Popular JavaScript Frameworks',
         data: stars,
         backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1
         }]
  }
})

alertDiv.addEventListener('click', (e)=> {
  if(e.target.tagName === 'SPAN') {
    if(e.target.className === 'close') {
      let h2 = e.target.parentNode;
      let alert = h2.parentNode;
      alert.removeChild(h2);
    }
  }
})
