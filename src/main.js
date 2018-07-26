window.onload = (()=>{
  // preloadOne();
  SearchRest();  
});

function preloadOne() {
  let preload = document.getElementById('preload');
  let loading = 0;
  let id = setInterval(frame, 64);

  function frame() {
    if (loading === 100) {
      clearInterval(id);
      window.open('index.html', '_self');
    } else {
      loading = loading + 1;
      if (loading === 90) {
        preload.style.animation = 'fadeout 1s ease';
      }
    }
  }
};

const inputText = document.querySelector('input');
const containerTitle = document.getElementById('counter');
const containerYear = document.getElementById('year');
const containerRuntime = document.getElementById('runtime');
const containerImage = document.getElementById('img');