var isXl = function(){
  return window.innerWidth > 1280;
}
var showClickElements = document.querySelectorAll('[data-show]');
var showClickHandler = function (switcher, state) {
  if (state == 'on') {
    if (!switcher.classList.contains('showed')) {
      switcher.classList.add('showed');
    }
  } else if (state == 'off') {
    switcher.classList.remove('showed');
  } else {
    switcher.classList.toggle('showed');
  }
  var collapseSelector = switcher.getAttribute('data-show');
  var el = document.querySelector(collapseSelector);
  console.log('SWITCHER', switcher, 'CONTROLLED', el);
  if (!el.classList.contains('hidden') && isXl()) {
    console.log('XL SWITCH');
    if (state == 'on') {
      switcher.classList.remove('xl:hidden');
    } else if (state == 'off') {
      if (!switcher.classList.contains('showed')) {
        el.classList.add('xl:hidden');
      }
    } else {
      el.classList.toggle('xl:hidden');
    }
  } else if(switcher.getAttribute('data-use') != 'xl') {
    if (state == 'on') {
      switcher.classList.remove('hidden');
    } else if (state == 'off') {
      if (!switcher.classList.contains('showed')) {
        el.classList.add('hidden');
      }
    } else {
      el.classList.toggle('hidden');
    }
  }
}
showClickElements.forEach(function (el) {
  el.addEventListener('click', function (e) {
    showClickElements.forEach(function (el) {
      if (el == e.currentTarget) {
        return
      }
      showClickHandler(el, 'off');
    });
    showClickHandler(e.currentTarget);
  });
});

if(isXl()) {
  var movingElements = document.querySelectorAll('[data-moveto]');
  movingElements.forEach(function(el){
    var movetoSelector = el.dataset['moveto'];
    var container = document.querySelector(movetoSelector);
    if(!container) {
      return;
    }
    container.appendChild(el);
  });
}