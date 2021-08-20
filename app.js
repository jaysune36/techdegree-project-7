const alertDiv = document.querySelector('.alert');

function alertMessage() {
  alertDiv.innerHTML = `<h2><span class='bold'>Alert</span>: You have unread messages</h2><span class='close'>&times;</span>`;
}

window.onload = alertMessage();

alertDiv.addEventListener('click', (e)=> {
  if(e.target.tagName === 'SPAN') {
    if(e.target.className === 'close') {
      let h2 = e.target.parentNode;
      let alert = h2.parentNode;
      alert.removeChild(h2);
    }
  }
})
